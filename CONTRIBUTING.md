# Contributing to FIXIA

Thank you for your interest in contributing to the FIXIA codebase.

---

## 1. Development Principles

- **Zero Unnecessary Dependencies:** Keep the core website fast, semantic, and vanilla wherever possible.
- **Strict Asset Optimization:** SVGs and web-optimized images only. Never commit uncompressed high-resolution images or media dumps.
- **Security First:** Never hardcode credentials, tokens, or passcodes. Do not implement client-only authentication gates.
- **Responsive & Accessible:** Ensure all pages render flawlessly across mobile (360px+), tablet, and desktop viewports.

---

## 2. Pull Request Workflow

1. Fork or branch from `main`.
2. Name your branch descriptively (e.g. `feature/calculator-improvements`, `fix/contact-mobile-layout`).
3. Verify your changes locally using `node serve.js`.
4. Ensure all JSON files (`projects_data.json`, `vercel.json`, `manifest.webmanifest`) are strictly valid JSON.
5. Submit a Pull Request targeting `main` using the provided Pull Request template.
6. Ensure all automated CI checks pass.
