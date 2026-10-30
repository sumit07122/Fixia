/**
 * FIXIA — Server-side Solution Builder Synthesis Endpoint
 * Combines multiple software ideas into a unified business architecture.
 * Compatible with Vercel Serverless Functions and Node.js http servers.
 */

const https = require('https');

// In-memory cache for synthesized solutions (1 hour TTL)
const solutionCache = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000;

// Rate limiter
const rateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

// Curated idea library reference
let CURATED_DATA = null;
try {
  CURATED_DATA = require('../ideas-data.js');
} catch (e) {
  try {
    CURATED_DATA = require('./ideas-data.js');
  } catch (err) {}
}

function sanitize(str = '', maxLen = 200) {
  return String(str)
    .replace(/[<>{}|\\]/g, '')
    .trim()
    .slice(0, maxLen);
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

// Find idea in curated dataset by ID or slug
function findIdeaById(id) {
  if (!CURATED_DATA || !Array.isArray(CURATED_DATA)) return null;
  const cleanId = String(id).toLowerCase().trim();
  for (const ind of CURATED_DATA) {
    const match = ind.ideas.find(i => i.id === cleanId || i.title.toLowerCase() === cleanId);
    if (match) return { ...match, industryName: ind.name, industrySlug: ind.slug };
  }
  return null;
}

// Deterministic Synthesis when AI is unavailable or as reliable fallback
function synthesizeCuratedSolution(bizName, desc, resolvedIdeas, remainingIdeas) {
  const count = resolvedIdeas.length;
  const bizClean = bizName || 'Business';
  const solutionName = `${bizClean} Unified Operations OS`;

  // Synthesize System Overview
  const moduleNames = resolvedIdeas.map(i => i.title).join(', ');
  const overview = {
    solutionName,
    tagline: `An integrated digital operations platform connecting ${count} core workflows into one synchronized system.`,
    whatItDoes: `Replaces disconnected spreadsheets, paper registers, and scattered WhatsApp chats with an end-to-end custom operational platform engineered for ${bizClean}. It unifies ${moduleNames} into a single shared database.`,
    mainBenefits: [
      `Eliminates double-entry and communication lag between floor staff and management`,
      `Prevents operational revenue leakage with automated digital tracking and audit logs`,
      `Recovers an estimated 12–18 hours of weekly manual administrative paperwork`,
      `Provides the business owner with real-time operational visibility from anywhere via smartphone`
    ],
    whyModulesWorkTogether: `Each module directly feeds data to the next: customer interactions seamlessly trigger staff task queues, update live inventory balances, and record financial transactions without manual intervention.`
  };

  // Synthesize Modules with explicit interconnections
  const modules = resolvedIdeas.map((idea, idx) => {
    let connectsTo = '';
    let dataManaged = '';

    if (idea.id.includes('order') || idea.id.includes('menu') || idea.id.includes('pos')) {
      connectsTo = 'Transmits live order tickets to Kitchen Display / Dispatcher and triggers raw ingredient deductions in Inventory.';
      dataManaged = 'Customer tickets, item modifiers, table numbers, timestamps, and payment statuses.';
    } else if (idea.id.includes('kds') || idea.id.includes('bay') || idea.id.includes('queue')) {
      connectsTo = 'Receives incoming requests from Front Desk / Customer app and alerts floor marshals when prep or service is complete.';
      dataManaged = 'Active session timers, station assignments, preparation countdowns, and completion logs.';
    } else if (idea.id.includes('inventory') || idea.id.includes('stock') || idea.id.includes('parts')) {
      connectsTo = 'Listens for sales/billing events to auto-deduct stock quantities and alerts purchasing leads when thresholds breach.';
      dataManaged = 'SKU counts, batch numbers, supplier rates, reorder thresholds, and shrinkage variances.';
    } else if (idea.id.includes('wa') || idea.id.includes('receipt') || idea.id.includes('alert') || idea.id.includes('bot')) {
      connectsTo = 'Hooks into completed transaction events to dispatch official WhatsApp PDF receipts and Google review links.';
      dataManaged = 'Customer phone numbers, message delivery receipts, PDF invoices, and feedback ratings.';
    } else if (idea.id.includes('loyalty') || idea.id.includes('member') || idea.id.includes('crm')) {
      connectsTo = 'Pulls customer purchase history from POS/Billing to award loyalty points and trigger automated re-engagement recall messages.';
      dataManaged = 'Customer profiles, lifetime spend, visit frequency, cashback credits, and custom preferences.';
    } else {
      const nextMod = resolvedIdeas[(idx + 1) % resolvedIdeas.length];
      connectsTo = `Synchronizes operational state changes directly with the ${nextMod.title} module and updates the master executive dashboard.`;
      dataManaged = 'Activity logs, user authorizations, task statuses, and operational metrics.';
    }

    return {
      id: idea.id,
      title: idea.title,
      softwareType: idea.softwareType,
      purpose: idea.oneLiner,
      features: idea.features || ['Real-time sync', 'Offline resilience', 'Zero per-user fees'],
      dataManaged,
      connectsTo
    };
  });

  // Synthesize Distinct Relevant User Roles
  const rolesSet = new Map();
  rolesSet.set('Business Owner / Director', {
    role: 'Business Owner / Director',
    access: 'Executive Command Dashboard (All Modules)',
    canDo: 'Inspect live daily revenue, monitor cross-station bottlenecks, approve expenses, and audit staff performance from phone.'
  });

  resolvedIdeas.forEach(i => {
    (i.whoUses || []).forEach(w => {
      const name = w.trim();
      if (!rolesSet.has(name) && rolesSet.size < 5) {
        let access = 'Module Operational View';
        let canDo = 'Executes daily duties, logs status updates, and coordinates with team.';
        if (name.toLowerCase().includes('customer') || name.toLowerCase().includes('guest') || name.toLowerCase().includes('patient')) {
          access = 'Self-Service Mobile Web Interface';
          canDo = 'Views live availability, places orders/bookings, downloads digital passes, and settles UPI payments.';
        } else if (name.toLowerCase().includes('chef') || name.toLowerCase().includes('cook') || name.toLowerCase().includes('technician')) {
          access = 'Kitchen / Workshop Execution Screen';
          canDo = 'Accepts prioritized jobs, marks prep stages complete, and reports inventory issues.';
        } else if (name.toLowerCase().includes('cashier') || name.toLowerCase().includes('reception')) {
          access = 'Front Desk POS & Counter Terminal';
          canDo = 'Checks in visitors, handles payments, prints thermal bills, and manages waiting queues.';
        }
        rolesSet.set(name, { role: name, access, canDo });
      }
    });
  });

  // Synthesize End-to-End Workflow Steps
  const workflowSteps = [];
  workflowSteps.push({
    step: 1,
    title: 'Customer Interaction & Intake',
    actor: 'Customer / Front Desk',
    action: `Client initiates service request or order via the self-service web interface or reception counter.`,
    systemResponse: `System logs transaction, validates availability, and generates a unique tracking ID.`
  });
  workflowSteps.push({
    step: 2,
    title: 'Instant Task Routing & Station Dispatch',
    actor: 'Core Event Broker',
    action: `System automatically routes tickets to appropriate department stations (${modules.slice(0, 2).map(m => m.title).join(' & ')}).`,
    systemResponse: `Station screens chime with priority timers, removing verbal shouting or paper ticket loss.`
  });
  workflowSteps.push({
    step: 3,
    title: 'Operational Execution & Real-Time Sync',
    actor: 'Floor Staff / Technicians',
    action: `Team prepares order, carries out service, or conducts session while updating task checkpoints.`,
    systemResponse: `Inventory balances deduct in real time; customer can view live progress on mobile.`
  });
  workflowSteps.push({
    step: 4,
    title: 'Automated Settlement & Customer Care',
    actor: 'Automation Engine',
    action: `Order or session closes; system generates itemized tax invoice and sends digital copy via WhatsApp.`,
    systemResponse: `Customer receives verified PDF bill and 1-tap review link; loyalty wallet credits update automatically.`
  });
  workflowSteps.push({
    step: 5,
    title: 'Owner Nightly Reconciliation & Reporting',
    actor: 'Business Owner',
    action: `Cash drawer reconciles against digital sales, staff expenses, and inventory usage.`,
    systemResponse: `Executive summary dispatched to owner's WhatsApp at shift close with zero accounting discrepancies.`
  });

  // Suggested Dashboard Widgets
  const dashboard = {
    overviewKpis: [
      { label: 'TODAY\'S REVENUE', value: 'Live Counter', note: 'Split by UPI, Cash & Online' },
      { label: 'ACTIVE WORKLOAD', value: `${count} Modules Online`, note: '0ms Latency Synchronization' },
      { label: 'SYSTEM HEALTH', value: '100% Operational', note: 'Offline-Resilient Cloud Engine' }
    ],
    pendingTasks: [
      '3 Inventory items nearing safety reorder thresholds',
      'Daily shift handover reconciliation awaiting owner sign-off'
    ],
    liveAlerts: [
      'Low Stock Alert: Auto-generated purchase order drafted for supplier review',
      'Peak Hour Buffer: Automated staff task allocation optimized for evening rush'
    ],
    reportsGenerated: [
      'Daily Revenue & Collection Variance Report (PDF)',
      'Weekly Operational Efficiency & Labor Cost Analysis'
    ]
  };

  // Logical Future Upgrades
  const futureExpansions = (remainingIdeas || []).slice(0, 3).map(i => ({
    title: i.title,
    purpose: i.oneLiner,
    tier: i.tier === 'next-gen' ? 'Next-Generation' : 'Growth',
    whyAddLater: `Can be plugged into this unified core without rewriting existing workflows as your business scales.`
  }));

  return {
    ok: true,
    business: bizClean,
    description: desc,
    solutionName,
    source: 'curated',
    overview,
    modules,
    userRoles: Array.from(rolesSet.values()),
    workflowSteps,
    dashboard,
    futureExpansions
  };
}

// AI Multi-Module Architecture Synthesis
async function callAISolution(bizName, desc, resolvedIdeas, remainingIdeas) {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openaiKey) return null;

  const moduleSummary = resolvedIdeas.map(i => `- ${i.title} (${i.softwareType}): ${i.oneLiner}`).join('\n');

  const prompt = `You are FIXIA's Senior Solutions Architect and Principal Systems Engineer.
A client running a "${bizName}" (${desc || 'commercial business'}) has selected these ${resolvedIdeas.length} specific software modules:
${moduleSummary}

Your mission: Synthesize these selected modules into ONE unified, coherent software system architecture.

Return ONLY raw JSON matching this schema:
{
  "solutionName": "Creative unified system name (e.g. Apex DineOS / Vrindavan PropertyHub)",
  "overview": {
    "solutionName": "Exact solution name",
    "tagline": "One sharp architectural tagline",
    "whatItDoes": "Detailed explanation of what the complete unified platform does",
    "mainBenefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"],
    "whyModulesWorkTogether": "Why these specific modules create a powerful compound synergy"
  },
  "modules": [
    {
      "id": "module-id",
      "title": "Module Title",
      "softwareType": "Software Type",
      "purpose": "Precise operational purpose",
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "dataManaged": "Key data entities it manages",
      "connectsTo": "Exactly how this module passes data to and receives data from other modules in the system"
    }
  ],
  "userRoles": [
    {
      "role": "Role Name (e.g. Owner, Kitchen Chef, Guest)",
      "access": "Access level and screens",
      "canDo": "Specific actions this user performs daily"
    }
  ],
  "workflowSteps": [
    {
      "step": 1,
      "title": "Phase title",
      "actor": "Who initiates",
      "action": "What happens",
      "systemResponse": "How the software responds automatically"
    }
  ],
  "dashboard": {
    "overviewKpis": [
      { "label": "KPI Label", "value": "Metric", "note": "Context note" }
    ],
    "pendingTasks": ["Task 1", "Task 2"],
    "liveAlerts": ["Alert 1", "Alert 2"],
    "reportsGenerated": ["Report 1", "Report 2"]
  },
  "futureExpansions": [
    {
      "title": "Future Module Name",
      "purpose": "What it will do when added",
      "tier": "Growth or Next-Generation",
      "whyAddLater": "Why this is a great phase 2 upgrade"
    }
  ]
}
No markdown backticks. Return strictly raw JSON.`;

  if (geminiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
    const payload = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.25,
        responseMimeType: "application/json"
      }
    });

    return new Promise((resolve) => {
      const u = new URL(url);
      const req = https.request({
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        },
        timeout: 16000
      }, res => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) return resolve(null);
            resolve(JSON.parse(text));
          } catch (e) {
            resolve(null);
          }
        });
      });
      req.on('error', () => resolve(null));
      req.on('timeout', () => { req.destroy(); resolve(null); });
      req.write(payload);
      req.end();
    });
  }

  return null;
}

// Master Handler
async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  if (!checkRateLimit(ip)) {
    res.statusCode = 429;
    return res.end(JSON.stringify({ error: 'Too many requests. Please wait a moment.' }));
  }

  let body = {};
  if (req.method === 'POST') {
    if (typeof req.body === 'object' && req.body !== null) {
      body = req.body;
    } else {
      try {
        const raw = await new Promise((resolve, reject) => {
          let str = '';
          req.on('data', c => str += c);
          req.on('end', () => resolve(str));
          req.on('error', reject);
        });
        body = JSON.parse(raw || '{}');
      } catch (e) {
        body = {};
      }
    }
  } else {
    const urlObj = new URL(req.url, 'http://localhost');
    body = {
      business: urlObj.searchParams.get('biz') || urlObj.searchParams.get('business'),
      description: urlObj.searchParams.get('desc') || urlObj.searchParams.get('description'),
      ideas: urlObj.searchParams.get('ideas') ? urlObj.searchParams.get('ideas').split(',') : []
    };
  }

  const business = sanitize(body.business || 'Custom Business', 120);
  const description = sanitize(body.description || '', 400);
  let rawIdeaIds = Array.isArray(body.ideas) ? body.ideas : (body.ideas ? String(body.ideas).split(',') : []);

  // Filter and sanitize idea IDs
  const ideaIds = rawIdeaIds.map(x => sanitize(x, 80)).filter(Boolean);

  if (!ideaIds.length) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Please select at least one software module to build a solution.' }));
  }

  // Resolve ideas from curated library
  const resolvedIdeas = [];
  const unmatched = [];
  for (const id of ideaIds) {
    const match = findIdeaById(id);
    if (match) {
      resolvedIdeas.push(match);
    } else {
      unmatched.push(id);
    }
  }

  // If any was unmatched by ID, create a structured entity
  unmatched.forEach(name => {
    resolvedIdeas.push({
      id: sanitize(name.toLowerCase().replace(/\s+/g, '-'), 50),
      tier: 'essential',
      title: name,
      oneLiner: `Custom software module designed specifically for ${business}.`,
      problem: `Manual delays and lack of automated tracking for ${name}.`,
      softwareType: 'Custom Software',
      whoUses: ['Business Owner', 'Team Staff'],
      features: ['Automated tracking', 'Real-time synchronization', 'Digital audit logs']
    });
  });

  // Check Cache
  const cacheKey = `${business}::${ideaIds.sort().join(',')}::${description}`.toLowerCase();
  const cached = solutionCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ...cached.data, cached: true }));
  }

  // Collect remaining ideas from same industry for logical future expansions
  const remainingIdeas = [];
  if (CURATED_DATA && resolvedIdeas.length > 0 && resolvedIdeas[0].industryName) {
    const matchedInd = CURATED_DATA.find(ind => ind.name === resolvedIdeas[0].industryName || ind.slug === resolvedIdeas[0].industrySlug);
    if (matchedInd) {
      matchedInd.ideas.forEach(i => {
        if (!ideaIds.includes(i.id)) {
          remainingIdeas.push(i);
        }
      });
    }
  }

  // Attempt AI Synthesis if key present
  let aiResult = null;
  const hasAiKey = Boolean(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.AI_API_KEY);
  if (hasAiKey) {
    try {
      aiResult = await callAISolution(business, description, resolvedIdeas, remainingIdeas);
    } catch (e) {
      aiResult = null;
    }
  }

  let finalResponse = null;
  if (aiResult && aiResult.overview && Array.isArray(aiResult.modules) && aiResult.modules.length) {
    finalResponse = {
      ok: true,
      business,
      description,
      solutionName: aiResult.solutionName || `${business} Operations OS`,
      source: 'ai',
      aiConfigured: true,
      overview: aiResult.overview,
      modules: aiResult.modules,
      userRoles: aiResult.userRoles || [],
      workflowSteps: aiResult.workflowSteps || [],
      dashboard: aiResult.dashboard || {},
      futureExpansions: aiResult.futureExpansions || []
    };
  } else {
    // Curated high-fidelity synthesis
    finalResponse = synthesizeCuratedSolution(business, description, resolvedIdeas, remainingIdeas);
    finalResponse.aiConfigured = hasAiKey;
  }

  // Cache
  if (solutionCache.size > 80) {
    const firstKey = solutionCache.keys().next().value;
    solutionCache.delete(firstKey);
  }
  solutionCache.set(cacheKey, { timestamp: Date.now(), data: finalResponse });

  res.statusCode = 200;
  return res.end(JSON.stringify(finalResponse));
}

module.exports = handler;
