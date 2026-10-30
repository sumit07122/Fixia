/**
 * FIXIA Privacy-Friendly Telemetry Utility
 * 
 * Tracks core funnel events without collecting personal information (PII).
 * Guaranteed non-blocking: analytics errors never break user interactions.
 */
(function() {
  'use strict';

  // Standard safe event schema
  const ALLOWED_EVENTS = new Set([
    'discovery_search',
    'blueprint_viewed',
    'solution_module_selected',
    'solution_builder_generated',
    'contact_step_advanced',
    'inquiry_submitted',
    'live_demo_clicked'
  ]);

  const piiKeys = new Set(['name', 'email', 'phone', 'whatsapp', 'contact', 'password', 'token', 'secret']);

  function sanitizePayload(data) {
    if (!data || typeof data !== 'object') return {};
    const clean = {};
    for (const [k, v] of Object.entries(data)) {
      if (piiKeys.has(k.toLowerCase())) continue;
      if (typeof v === 'string') clean[k] = v.slice(0, 120); // enforce length limit
      else if (typeof v === 'number' || typeof v === 'boolean') clean[k] = v;
      else if (Array.isArray(v)) clean[k] = v.length;
    }
    return clean;
  }

  function track(eventName, payload = {}) {
    try {
      if (!ALLOWED_EVENTS.has(eventName)) return;
      const eventData = {
        event: eventName,
        ts: Date.now(),
        path: location.pathname,
        data: sanitizePayload(payload)
      };

      // Push to GTM/GA dataLayer if present
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);

      // Store in session storage for local debugging
      try {
        const history = JSON.parse(sessionStorage.getItem('fx_events') || '[]');
        if (history.length > 50) history.shift();
        history.push(eventData);
        sessionStorage.setItem('fx_events', JSON.stringify(history));
      } catch (e) {}

      // Console telemetry in development
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        // quiet log
      }
    } catch (err) {
      // Never break application flow on telemetry error
    }
  }

  // Export global API
  window.fixiaAnalytics = { track };

  // Auto-wire event delegations
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Live demo links clicked
    document.addEventListener('click', e => {
      const liveBtn = e.target.closest('a[href^="http"]');
      if (liveBtn && (liveBtn.classList.contains('bf-live-pill') || liveBtn.textContent.includes('Live Site') || liveBtn.textContent.includes('Visit Live Site'))) {
        track('live_demo_clicked', { url: liveBtn.getAttribute('href') });
      }
    });

    // 2. Discovery Form on Homepage
    const discForm = document.getElementById('homeDiscoveryForm');
    if (discForm) {
      discForm.addEventListener('submit', () => {
        const input = document.getElementById('homeBizInput');
        track('discovery_search', { business: input ? input.value : '' });
      });
    }

    // 3. Popular Chips
    document.querySelectorAll('.disc-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        track('discovery_search', { business: chip.getAttribute('data-val') || chip.textContent.trim(), source: 'chip' });
      });
    });
  });
})();

