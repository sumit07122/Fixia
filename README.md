# FIXIA — Official Agency & Portfolio Website

Welcome to the official repository for **FIXIA** (`www.fixia.in`).

FIXIA is an engineering and design studio building custom software, web platforms, Android applications, and ERP business systems for growing businesses and enterprises.

---

## 1. Project Overview

This repository contains the production static web application and serverless inquiry endpoints powering FIXIA.

### Core Architecture
- **Frontend:** Semantic HTML5, modern CSS3 (with responsive layouts, micro-interactions, and dark aesthetic), vanilla JavaScript (ES2022).
- **Interactive Tools:**
  - **Dynamic Cost Calculator:** Interactive project estimator across mobile, web, and custom ERP dimensions (`calculator.html`).
  - **AI Problem Brief & Solution Architect:** Real-time business problem generator and technical solution builder (`solution-builder.html`, `ideas.html`).
  - **Dynamic Case Studies:** 7 real-world client case study deep-dives rendered dynamically from structured data (`projects_data.json`).
- **Inquiry & Lead Engine:** Secure serverless handler (`api/inquiry.js`) supporting automated input sanitization, IP rate-limiting, and PostgreSQL persistence.
- **Hosting & CDN:** Vercel Edge Platform with clean URL routing, security headers, and compression.

---

## 2. Directory Structure

```text
├── api/                        # Serverless function endpoints
│   ├── generate-ideas.js       # Business idea generator
│   ├── generate-solution.js    # Solution blueprint architect
│   └── inquiry.js              # Lead submission & storage handler
├── assets/                     # Optimized visual assets & illustrations
├── data/                       # Data schemas and local storage targets
│   └── inquiries.json          # Persistent inquiry target
├── logo/                       # Official FIXIA vector brand assets
├── 404.html                    # Branded error page
├── index.html                  # Main homepage
├── calculator.html             # Project cost estimation engine
├── solution-builder.html       # Solution architect tool
├── projects_data.json          # Authoritative portfolio case studies
├── serve.js                    # Local development HTTP server
├── styles.css                  # Primary design system stylesheet
├── polish.css                  # Typography and animation enhancements
└── vercel.json                 # Vercel edge deployment configuration
```

---

## 3. Local Development

To run the FIXIA website locally without external build tools:

```bash
# Clone the repository
git clone https://github.com/sumit07122/Fixia.git
cd Fixia

# Start local server (binds to http://localhost:3000 and http://localhost:5000)
node serve.js
```

Or preview with any static HTTP server:
```bash
npx serve .
```

---

## 4. Security & Quality Standards

- **Zero Client-Side Admin Credentials:** Administrative and data modifications require authenticated server-side APIs.
- **Edge Security Headers:** Strict Content Security Policy (CSP), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Strict-Transport-Security`.
- **Automated CI Validation:** HTML validation, JavaScript syntax checks, JSON verification, asset checks, and secret scans via GitHub Actions.

For vulnerability reporting procedures, see [SECURITY.md](SECURITY.md).
