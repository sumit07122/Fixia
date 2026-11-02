/**
/**
 * FIXIA — Secure Lead Infrastructure & Inquiry API Endpoint
 * Handles persistent storage of business inquiries, validation, spam protection,
 * rate limiting, and optional notifications.
 *
 * Compatible with Vercel Serverless Functions and Node.js http servers.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const crypto = require('crypto');

// Rate Limiter: max 15 inquiries per IP per 10 minutes
const rateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 15;

// Data directory resolution
const LOCAL_DATA_DIR = path.join(__dirname, '..', 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'inquiries.json');
const TMP_DATA_FILE = path.join(os.tmpdir(), 'fixia_inquiries.json');

// Ensure local data directory exists if writable
try {
  if (!fs.existsSync(LOCAL_DATA_DIR)) {
    fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
  }
} catch (e) {}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers['x-real-ip'];
  if (realIp) return realIp.trim();
  return req.socket ? req.socket.remoteAddress || '127.0.0.1' : '127.0.0.1';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimits.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + RATE_LIMIT_WINDOW_MS;
  } else {
    record.count += 1;
  }
  rateLimits.set(ip, record);
  return record.count <= MAX_REQUESTS_PER_WINDOW;
}

function sanitizeText(str = '', maxLen = 500) {
  return String(str)
    .replace(/[<>]/g, '') // Strip basic HTML tags
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant simplified regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 16;
}

// Durable file storage (appends to inquiries.json)
async function saveToFileStorage(inquiry) {
  let targetFile = LOCAL_DATA_FILE;
  let saved = false;

  const tryWrite = (filePath) => {
    let existing = [];
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        existing = JSON.parse(raw || '[]');
        if (!Array.isArray(existing)) existing = [];
      }
    } catch (e) {
      existing = [];
    }

    existing.unshift(inquiry);
    // Keep max 1000 local inquiries
    if (existing.length > 1000) existing = existing.slice(0, 1000);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
    return true;
  };

  try {
    saved = tryWrite(LOCAL_DATA_FILE);
  } catch (err) {
    // If local dir is read-only (e.g. serverless read-only filesystem), fallback to os.tmpdir()
    try {
      saved = tryWrite(TMP_DATA_FILE);
      targetFile = TMP_DATA_FILE;
    } catch (tmpErr) {
      saved = false;
    }
  }

  return { saved, targetFile };
}

// PostgreSQL persistent storage adapter
// Neon Serverless HTTP client cache
let cachedNeonClient = null;
let cachedDbUrl = null;

function getNeonClient(dbUrl) {
  if (cachedNeonClient && cachedDbUrl === dbUrl) {
    return cachedNeonClient;
  }
  try {
    const { neon } = require('@neondatabase/serverless');
    cachedNeonClient = neon(dbUrl);
    cachedDbUrl = dbUrl;
    return cachedNeonClient;
  } catch (err) {
    return null;
  }
}

// PostgreSQL persistent storage adapter via Neon HTTP serverless driver
async function saveToPostgres(inquiry) {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return { attempted: false, saved: false, reason: 'Missing DATABASE_URL environment variable' };

  const sql = getNeonClient(dbUrl);
  if (!sql) {
    return { attempted: true, saved: false, reason: '@neondatabase/serverless driver unavailable' };
  }

  try {
    // 1. Ensure schema exists (idempotent DDL)
    await sql(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(64) PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        name VARCHAR(255) NOT NULL,
        business VARCHAR(255),
        email VARCHAR(255),
        whatsapp VARCHAR(100),
        business_type VARCHAR(255),
        focus VARCHAR(255),
        problem TEXT NOT NULL,
        budget VARCHAR(100),
        timeline VARCHAR(100),
        ip_hash VARCHAR(64),
        source VARCHAR(50),
        status VARCHAR(50) DEFAULT 'new'
      );
    `);

    // 2. Insert record via parameterized SQL query
    await sql(`
      INSERT INTO inquiries (
        id, created_at, name, business, email, whatsapp,
        business_type, focus, problem, budget, timeline,
        ip_hash, source, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
    `, [
      inquiry.id,
      inquiry.created_at,
      inquiry.name,
      inquiry.business,
      inquiry.email,
      inquiry.whatsapp,
      inquiry.businessType,
      inquiry.focus,
      inquiry.problem,
      inquiry.budget,
      inquiry.timeline,
      inquiry.ip_hash,
      inquiry.source,
      inquiry.status
    ]);

    return { attempted: true, saved: true };
  } catch (dbErr) {
    const safeError = dbErr.code ? `Postgres error code: ${dbErr.code}` : (dbErr.message || 'Database query error');
    return { attempted: true, saved: false, error: safeError };
  }
}

// Dispatch optional Telegram notification
async function dispatchTelegramNotification(inquiry) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const msg = [
    `*🚀 New FIXIA Problem Brief*`,
    `*Client:* ${inquiry.name} (${inquiry.business || 'N/A'})`,
    `*Contact:* ${inquiry.whatsapp || inquiry.email}`,
    `*Business Type:* ${inquiry.businessType || 'N/A'}`,
    `*Focus:* ${inquiry.focus || 'Custom Solution'}`,
    `*Scope:* ${inquiry.budget} · ${inquiry.timeline}`,
    `*Problem:*`,
    `_${inquiry.problem.slice(0, 300)}${inquiry.problem.length > 300 ? '...' : ''}_`
  ].join('\n');

  return new Promise((resolve) => {
    const postData = JSON.stringify({
      chat_id: chatId,
      text: msg,
      parse_mode: 'Markdown'
    });

    const req = https.request({
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 4000
    }, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.write(postData);
    req.end();
  });
}

// Dispatch optional Generic Webhook notification
async function dispatchWebhookNotification(inquiry) {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const urlObj = new URL(webhookUrl);
    const postData = JSON.stringify({
      event: 'inquiry.created',
      timestamp: inquiry.created_at,
      id: inquiry.id,
      name: inquiry.name,
      business: inquiry.business,
      email: inquiry.email,
      whatsapp: inquiry.whatsapp,
      focus: inquiry.focus,
      problem: inquiry.problem,
      budget: inquiry.budget,
      timeline: inquiry.timeline
    });

    return new Promise((resolve) => {
      const client = urlObj.protocol === 'https:' ? https : require('http');
      const req = client.request({
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 4000
      }, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 300);
      });

      req.on('error', () => resolve(false));
      req.on('timeout', () => { req.destroy(); resolve(false); });
      req.write(postData);
      req.end();
    });
  } catch (e) {
    return false;
  }
}

// Main Request Handler
async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed. Use POST.' }));
  }

  const clientIp = getClientIp(req);

  // Rate Limiting
  if (!checkRateLimit(clientIp)) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      ok: false,
      error: 'Too many submissions from this connection. Please wait a few minutes or reach us directly on WhatsApp (+91 84488 58700).'
    }));
  }

  // Parse Body
  let body = {};
  if (typeof req.body === 'object' && req.body !== null) {
    body = req.body;
  } else {
    try {
      const raw = await new Promise((resolve, reject) => {
        let str = '';
        req.on('data', chunk => {
          str += chunk;
          if (str.length > 50000) reject(new Error('Payload too large'));
        });
        req.on('end', () => resolve(str));
        req.on('error', reject);
      });
      body = JSON.parse(raw || '{}');
    } catch (err) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ ok: false, error: 'Invalid JSON request payload.' }));
    }
  }

  // Honeypot spam trap
  if (body.website_hp || body.confirm_email) {
    // Return fake success for spam bots without storing
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: true, id: 'inq_ack', message: 'Inquiry received.' }));
  }

  // Validation
  const name = sanitizeText(body.name, 100);
  const business = sanitizeText(body.business, 120);
  const businessType = sanitizeText(body.businessType || body.type, 150);
  const email = sanitizeText(body.email, 120);
  const whatsapp = sanitizeText(body.whatsapp || body.wa || body.phone, 40);
  const problem = sanitizeText(body.problem, 3000);
  const focus = sanitizeText(body.focus, 200);
  const budget = sanitizeText(body.budget, 100);
  const timeline = sanitizeText(body.timeline, 100);
  const source = sanitizeText(body.source || 'web_contact', 50);

  if (!name || name.length < 2) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, error: 'Please provide your name (at least 2 characters).' }));
  }

  if (!problem || problem.length < 10) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, error: 'Please describe your business problem or requirement (at least 10 characters).' }));
  }

  const hasValidEmail = isValidEmail(email);
  const hasValidPhone = isValidPhone(whatsapp);

  if (!hasValidEmail && !hasValidPhone) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      ok: false,
      error: 'Please provide at least one valid contact method (email or WhatsApp number) so our engineering team can reply.'
    }));
  }

  // Construct structured inquiry record
  const ipHash = crypto.createHash('sha256').update(clientIp + 'fx_salt').digest('hex').slice(0, 16);
  const inquiryId = `inq_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const nowIso = new Date().toISOString();

  const record = {
    id: inquiryId,
    created_at: nowIso,
    name,
    business: business || businessType || 'Unspecified',
    businessType,
    email: hasValidEmail ? email.toLowerCase() : '',
    whatsapp: hasValidPhone ? whatsapp : '',
    problem,
    focus: focus || 'Custom Solution',
    budget: budget || '₹14,999 – ₹50,000 (Foundational Tier)',
    timeline: timeline || '1–2 months',
    ip_hash: ipHash,
    source,
    status: 'new'
  };

  // 1. Persistent Storage: Try PostgreSQL first if configured, always ensure local file storage
  // 1. Persistent Storage Pipeline
  const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
  const dbConfigured = Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);

  let pgResult = { attempted: false, saved: false };
  if (dbConfigured) {
    try {
      pgResult = await saveToPostgres(record);
    } catch (e) {
      pgResult = { attempted: true, saved: false, error: 'Database execution error' };
    }
  }

  const fileResult = await saveToFileStorage(record);

  // Production requirement: Must persist to durable database. Never silently fall back to ephemeral /tmp storage on Vercel.
  if (isProduction && !pgResult.saved) {
    console.error(`[FIXIA Lead Engine Error] Production inquiry storage failed for ID ${inquiryId}. DB configured: ${dbConfigured}. Reason: ${pgResult.error || pgResult.reason || 'Durable persistence failed'}`);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      ok: false,
      error: 'Inquiry persistence service is temporarily unavailable in production. Please contact FIXIA engineering directly on WhatsApp (+91 84488 58700).'
    }));
  }

  if (!pgResult.saved && !fileResult.saved) {
    // Both database and local file storage failed
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      ok: false,
      error: 'Unable to save inquiry to persistent storage. Please reach our engineering leads directly on WhatsApp (+91 84488 58700).'
    }));
  }

  // Safe logging (zero personal information in stdout)
  console.log(`[FIXIA Lead Engine] Stored inquiry ${inquiryId} (Postgres: ${pgResult.saved ? 'YES' : 'NO'}, Local File: ${fileResult.saved ? 'YES' : 'NO'}, Env: ${isProduction ? 'prod' : 'dev'})`);

  // 2. Notifications: Trigger only AFTER successful storage, isolated in non-blocking try-catch
  try {
    await Promise.allSettled([
      dispatchTelegramNotification(record),
      dispatchWebhookNotification(record)
    ]);
  } catch (notifErr) {
    // Notification failure does NOT affect already stored inquiry
  }

  // Return clean success response (without exposing internal DB paths or server envs)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({
    ok: true,
    id: inquiryId,
    message: 'Your problem brief has been securely stored. FIXIA engineering leads will review it within 6 business hours.',
    storedAt: nowIso
  }));
}

module.exports = handler;
