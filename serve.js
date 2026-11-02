const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple .env parser without dependencies
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of envLines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val;
      }
    }
  }
} catch (e) {}

const PORT = process.env.PORT || 3000;
const ALT_PORT = 5000;
const ROOT = __dirname;
let apiHandler = null;
let solutionHandler = null;
let inquiryHandler = null;
try {
  apiHandler = require('./api/generate-ideas.js');
} catch (e) {}
try {
  solutionHandler = require('./api/generate-solution.js');
} catch (e) {}
try {
  inquiryHandler = require('./api/inquiry.js');
} catch (e) {}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function handleRequest(req, res) {
  // Route /api/inquiry to lead infrastructure handler
  if (req.url.startsWith('/api/inquiry') && inquiryHandler) {
    return inquiryHandler(req, res);
  }
  // Route /api/generate-solution to serverless function handler
  if (req.url.startsWith('/api/generate-solution') && solutionHandler) {
    return solutionHandler(req, res);
  }
  // Route /api/generate-ideas to serverless function handler
  if (req.url.startsWith('/api/generate-ideas') && apiHandler) {
    return apiHandler(req, res);
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  // Security: Unauthenticated admin prototype is disabled from public access
  if (reqPath === '/admin' || reqPath === '/admin.html') {
    const notFoundPath = path.join(ROOT, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(notFoundPath));
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 Not Found');
  }
  
  let filePath = path.join(ROOT, reqPath);
  
  // Security: prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // try .html
      if (!path.extname(filePath)) {
        filePath += '.html';
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self';"
      });
      res.end(data);
    });
  });
}

// Start listeners on ports 5000 and 3000 with dual-stack (IPv4 + IPv6 localhost support)
function startServer(port) {
  const s = http.createServer(handleRequest);
  s.on('error', (err) => {
    console.error(`Port ${port} error:`, err.message);
  });
  // Omitting host binds to dual-stack on Node.js (both 127.0.0.1 and [::1] localhost)
  s.listen(port, () => {
    console.log(`FIXIA Server listening on http://localhost:${port}/ and http://127.0.0.1:${port}/`);
  });
  return s;
}

// Start primary on 5000 and secondary on 3000 (or vice versa based on PORT env)
const PRIMARY_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const SECONDARY_PORT = PRIMARY_PORT === 5000 ? 3000 : 5000;

startServer(PRIMARY_PORT);
if (SECONDARY_PORT !== PRIMARY_PORT) {
  startServer(SECONDARY_PORT);
}
