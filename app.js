const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const B = document.body, PG = B.dataset.page;
const ic = n => `<svg class="ico"><use href="#${n}"/></svg>`;
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const pages = [
  ['index', 'Home'],
  ['services', 'Services'],
  ['ideas', 'Explore Ideas'],
  ['work', 'Work'],
  ['process', 'Process'],
  ['pricing', 'Pricing'],
  ['about', 'About'],
  ['faq', 'FAQ'],
  ['contact', 'Contact']
];

/* Interactive Product UI Generator */
function app(title, kpis, rows, badge = 'Live System') {
  return `
    <div class="app">
      <div class="ah">
        <div class="ah-left">
          <span class="win-dots"><i></i><i></i><i></i></span>
          <span>${title}</span>
        </div>
        <small><span class="dot"></span>${badge}</small>
      </div>
      <div class="kp">
        ${kpis.map(([l, v]) => `<div><small>${l}</small><b>${v}</b></div>`).join('')}
      </div>
      <div>
        ${rows.map(([t, s, b]) => `<div class="ar"><b>${t}</b><span>${s}</span><em>${b}</em></div>`).join('')}
      </div>
      <div class="app-foot">
        <span>FIXIA Core Engine · v2.6</span>
        <span class="spark"><i></i><i></i><i></i><i></i><i></i></span>
      </div>
    </div>
  `;
}

/* ==========================================================
   REAL CLIENT PROJECTS DATA (100% Truthful, Verified from Live Sites)
   ========================================================== */
const REAL_PROJECTS = [
  {
    id: "himalaya-escape",
    title: "Himalaya Escape",
    client: "Himalayan Student Expeditions",
    url: "https://himalaya-escape.vercel.app/",
    domain: "himalaya-escape.vercel.app",
    category: "Travel & Booking",
    categorySlug: "travel",
    featured: true,
    tagline: "High-Altitude Student Expedition & Live Booking Experience",
    shortDesc: "Official student expedition portal featuring live mountain weather feeds, bus cabin & seat reservations, group-discount logic, and automated digital boarding pass generation.",
    desktopImg: "assets/projects/himalaya-escape-desktop.png",
    mobileImg: "assets/projects/himalaya-escape-mobile.png",
    overview: "Himalaya Escape operates curated 6-day expeditions from the plains to Manali & Kasol for student groups and young adventurers.",
    challenge: "Managing group bookings, seating allocations, and payments across WhatsApp spreadsheets was chaotic, slow, and prone to double-booking errors.",
    whatWeBuilt: [
      "Interactive 46-seat bus cabin reservation system with live availability indicators",
      "Real-time mountain weather widget integration for Manali and Kasol trail conditions",
      "Automated tier-based group savings calculator ('Bring 4 friends, save ₹300 each')",
      "Instant digital boarding pass generation with passenger itinerary and emergency details"
    ],
    result: "Delivered a high-conversion, self-serve expedition booking platform with instant cabin reservation and zero manual seating coordination.",
    tags: ["Seat Reservation", "Live Weather API", "Boarding Pass Generation", "Expedition Portal"]
  },
  {
    id: "oneshot",
    title: "One Shot / CueDesk",
    client: "One Shot Snooker & Gaming Arena",
    url: "https://oneshot-livid.vercel.app/",
    domain: "oneshot-livid.vercel.app",
    category: "Custom Software & SaaS",
    categorySlug: "software",
    featured: true,
    tagline: "Real-Time Snooker Arena ERP & Operational Dashboard",
    shortDesc: "Comprehensive club operations platform managing live table timers, point-of-sale snack billing, staff expense management, and automated daily cash reconciliation.",
    desktopImg: "assets/projects/oneshot-desktop.png",
    mobileImg: "assets/projects/oneshot-mobile.png",
    overview: "One Shot is a high-traffic billiards and snooker gaming arena requiring precise session billing and kitchen order tracking.",
    challenge: "Paper token logs and manual time calculations resulted in revenue leakages, unbilled cafe orders, and lengthy end-of-shift reconciliation disputes.",
    whatWeBuilt: [
      "Real-time 8-table session matrix tracking active minutes, table states (Snooker/Pool), and hourly rates",
      "Integrated POS billing combining hourly game duration with kitchen and snack orders into one ticket",
      "Staff management, daily expense auditing, and live net-cash balance tracking",
      "Cloud-synchronized offline-ready operational dashboard with instant daily close reports"
    ],
    result: "Replaced paper ledgers with an automated real-time management system that eliminates billing disputes and gives the owner total revenue visibility.",
    tags: ["Club ERP", "Live Table Timers", "POS & Kitchen Billing", "P&L Analytics"]
  },
  {
    id: "flexora",
    title: "Flexora",
    client: "Flexora Clothing Design Lab",
    url: "https://flexora-ivory.vercel.app/",
    domain: "flexora-ivory.vercel.app",
    category: "E-Commerce & Fashion",
    categorySlug: "ecommerce",
    featured: true,
    tagline: "Editorial Streetwear & Activewear Showcase",
    shortDesc: "High-aesthetic digital storefront and lookbook crafted for premium heavy organic hoodies, oversized drop-shoulder tees, and sweat-wicking activewear.",
    desktopImg: "assets/projects/flexora-desktop.png",
    mobileImg: "assets/projects/flexora-mobile.png",
    overview: "Flexora is a modern apparel brand fusing heavyweight luxury streetwear silhouettes with athletic performance gymwear.",
    challenge: "Standard e-commerce templates failed to convey the premium fabric weight, tailored drape, and cultural identity of the brand.",
    whatWeBuilt: [
      "Editorial drop-release lookbook architecture (Drop N°01 Luxury Casual & Drop N°02 Gymwear Elite)",
      "Technical fabric callouts (400+ GSM organic cotton, 4-way compression stretch, breathable mesh)",
      "Athlete Zone community showcase and customer photo review integration",
      "Mobile-optimized catalog navigation with fast collection filters and instant ordering flows"
    ],
    result: "Created a bespoke, high-retention digital brand presence that elevates perceived garment value and streamlines customer purchases.",
    tags: ["Editorial E-Commerce", "Drop Releases", "Lookbook Architecture", "Apparel Design"]
  },
  {
    id: "matrix-gym",
    title: "Matrix Gym",
    client: "The Matrix Gym",
    url: "https://www.matrixgym.in/",
    domain: "matrixgym.in",
    category: "Fitness & Wellness",
    categorySlug: "fitness",
    featured: true,
    tagline: "High-Energy Fitness Brand Platform & Membership Hub",
    shortDesc: "Commanding dark-mode digital presence showcasing state-of-the-art facility equipment, elite trainer credentials, structured training programs, and membership enrollment.",
    desktopImg: "assets/projects/matrix-gym-desktop.png",
    mobileImg: "assets/projects/matrix-gym-mobile.png",
    overview: "The Matrix Gym is an established, high-intensity training facility offering strength, conditioning, and personal coaching.",
    challenge: "The gym needed an impactful online platform to break out of walk-in dependence, demonstrate facility superiority, and convert local fitness seekers into active members.",
    whatWeBuilt: [
      "High-octane typographic visual identity capturing the grit and intensity of the gym",
      "Interactive program catalog for Strength, Power, Discipline, Hustle, and Endurance tracks",
      "Trainer credentials and coaching specializations showcase",
      "Frictionless direct WhatsApp & call-to-action lead capture funnel"
    ],
    result: "Delivered a bold, high-converting digital presence that positions the gym as the premier fitness authority in its region.",
    tags: ["Fitness Brand", "Program Showcase", "Lead Generation", "Coach Profiles"]
  },
  {
    id: "balaji-properties",
    title: "Balaji Properties",
    client: "Balaji Properties Real Estate",
    url: "https://balajipropertiess.vercel.app/",
    domain: "balajipropertiess.vercel.app",
    category: "Real Estate & Properties",
    categorySlug: "realestate",
    featured: false,
    tagline: "Prestige Property Advisory & Verified Land Portfolio",
    shortDesc: "Architectural real estate portal presenting verified gated plots, society apartments, and commercial land investment opportunities across Mathura & Vrindavan.",
    desktopImg: "assets/projects/balaji-properties-desktop.png",
    mobileImg: "assets/projects/balaji-properties-mobile.png",
    overview: "Balaji Properties is a premier property advisory firm guiding investors and families through land acquisitions and luxury residences.",
    challenge: "Real estate buyers require transparent verification of approvals, clear zoning demarcations, and authoritative guidance before booking consultations.",
    whatWeBuilt: [
      "Architectural property portfolio with categorized acquisition niches (Plots, Villas, Sky Penthouses)",
      "Verified land credentials, approval transparency badges, and purchase pathway guide",
      "Interactive property search filters by location and capital reserve capacity",
      "Direct private consultation scheduler and one-tap WhatsApp advisor connection"
    ],
    result: "Engineered an institutional-grade property platform that establishes immediate trust and drives qualified high-ticket investment leads.",
    tags: ["Property Portfolio", "Listing Filters", "Land Verification", "Consultation Booking"]
  },
  {
    id: "pradeep-classes",
    title: "Pradeep Classes",
    client: "Pradeep Classes Coaching Institute",
    url: "https://pradeepclasses.in/",
    domain: "pradeepclasses.in",
    category: "Education & Coaching",
    categorySlug: "education",
    featured: false,
    tagline: "Academic Portal & Entrance Exam Admissions Funnel",
    shortDesc: "Educational platform featuring specialized coaching tracks for Navodaya, Sainik School, and 1st-12th academic foundation with bilingual parent accessibility.",
    desktopImg: "assets/projects/pradeep-classes-desktop.png",
    mobileImg: "assets/projects/pradeep-classes-mobile.png",
    overview: "Pradeep Classes is a trusted coaching institution specializing in national defense school entrance exams and academic excellence.",
    challenge: "Parents needed clear visibility into exam preparation curriculums, batch timings, faculty qualifications, and proven track records to enroll online.",
    whatWeBuilt: [
      "Bilingual (English / Hindi) language switch for accessible parent communication",
      "Structured course breakdowns for Navodaya Prep, Military School, and IIT/NEET Foundation",
      "Verified student results and alumni achievements gallery",
      "Online admissions application workflow and integrated faculty credentials"
    ],
    result: "Transformed the institute's enrollment reach from local foot-traffic to a round-the-clock digital admissions pipeline.",
    tags: ["Education Portal", "Bilingual Support", "Admissions Funnel", "Results Showcase"]
  },
  {
    id: "rocket-147",
    title: "Rocket 147",
    client: "Rocket 147 Snooker & Pool Lounge",
    url: "https://rocket-147.vercel.app/",
    domain: "rocket-147.vercel.app",
    category: "Sports & Entertainment",
    categorySlug: "sports",
    featured: false,
    tagline: "Modern Billiards Lounge Showcase & Table Reservation Hub",
    shortDesc: "Immersive venue showcase for a premier billiards club featuring live atmospheric status, tiered table bookings, private VIP cabins, and tournament notices.",
    desktopImg: "assets/projects/rocket-147-desktop.png",
    mobileImg: "assets/projects/rocket-147-mobile.png",
    overview: "Rocket 147 is a modern snooker and pool club designed for recreational players and competitive cue-sports enthusiasts.",
    challenge: "Players experienced unpredictable table availability during evening rush hours without an easy way to check rates or reserve private cabins.",
    whatWeBuilt: [
      "Interactive table selector with clear hourly rates (Standard tables vs Private VIP Cabin)",
      "Live club atmosphere widget showing current local time and practice conditions",
      "In-house cafe menu showcase and club amenities guide",
      "Tournament schedule highlights and cue-sport community registration"
    ],
    result: "Equipped the club with an interactive digital booking hub that reduces customer wait times and boosts off-peak cabin reservations.",
    tags: ["Table Reservation", "Hourly Booking", "Venue Showcase", "Tournament Hub"]
  }
];

try { JSON.parse(localStorage.getItem('fx-projects') || '[]').forEach(p => REAL_PROJECTS.push(p)); } catch (e) {}
if (typeof window !== 'undefined') window.REAL_PROJECTS = REAL_PROJECTS;
/* Helper: Render macOS-Style Browser Mockup Frame */
function renderBrowserFrame(p, isHero = false) {
  return `
    <div class="browser-frame" id="bf-${p.id}">
      <div class="bf-bar">
        <div class="bf-dots"><span></span><span></span><span></span></div>
        <div class="bf-address">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>https://${p.domain}</span>
        </div>
        <a class="bf-live-pill" href="${p.url}" target="_blank" rel="noopener noreferrer">Visit Site ↗</a>
      </div>
      <div class="bf-screen">
        <img onerror="window.fxMotion&&fxMotion(this)" src="${p.desktopImg}?v=2" alt="${p.title} live interface preview" loading="${isHero ? 'eager' : 'lazy'}" width="1440" height="900">
        ${p.mobileImg ? `<div class="bf-phone"><img src="${p.mobileImg}?v=2" alt="${p.title} mobile interface" loading="lazy" width="390" height="844"></div>` : ''}
      </div>
    </div>
  `;
}

/* Vercel Web Analytics & Speed Insights */
if (typeof window !== 'undefined' && !window.va) {
  window.va = function () { (window.vaq = window.vaq || []).push(arguments); };
  if (location.hostname !== 'localhost' && !location.hostname.includes('127.0.0.1')) {
    const s1 = document.createElement('script');
    s1.defer = true;
    s1.src = '/_vercel/insights/script.js';
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.defer = true;
    s2.src = '/_vercel/speed-insights/script.js';
    document.head.appendChild(s2);
  }
}

/* Privacy-Friendly Lightweight Analytics */
if (typeof window !== 'undefined' && !window.fixiaAnalytics) {
  const anScript = document.createElement('script');
  anScript.defer = true;
  anScript.src = 'analytics.js';
  document.head.appendChild(anScript);
}

/* Base Shell Setup */
if (PG !== 'admin' && B.dataset.page !== 'admin' && PG !== '404' && B.dataset.page !== '404') {
B.insertAdjacentHTML('afterbegin', `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="arr" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>
    <symbol id="chk" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
    <symbol id="lg" viewBox="0 0 40 40"><path d="M8 5h24v7H15v23H8z"/><circle cx="26" cy="25" r="6.5" style="transform:translateY(var(--dy,0px));transition:transform .45s cubic-bezier(.16,1,.3,1)"/></symbol>
    <symbol id="cls" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
  </svg>
  <div class="bar" id="bar"></div>
  <div class="intro" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M8 5h24v7H15v23H8z"/><circle cx="26" cy="25" r="6.5"/></svg></div>
  <header>
    <div class="wrap nav">
      <a class="logo" href="index.html" aria-label="FIXIA home"><svg class="mk" aria-hidden="true"><use href="#lg"/></svg><span class="wm">FIXIA</span></a>
      <nav class="links" aria-label="Main">
        ${pages.map(p => `<a href="${p[0]}.html"${PG === p[0] ? ' aria-current="page"' : ''}>${p[1]}</a>`).join('')}
      </nav>
      <div class="navr">
        <a class="btn sm hi" href="contact.html">Discuss Your Project →</a>
        <button type="button" class="mob-btn" id="mobBtn" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobNav"><span></span></button>
      </div>
    </div>
  </header>
  <div class="mob-nav" id="mobNav" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
    <div class="mob-links">
      ${pages.map(p => `<a href="${p[0]}.html"${PG === p[0] ? ' aria-current="page"' : ''}>${p[1]} <span>→</span></a>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:2rem">
      <a class="btn hi" href="contact.html">Discuss Your Project →</a>
      <a class="btn" style="background:#22C55E;color:#fff;border-color:#16A34A;display:flex;align-items:center;justify-content:center;gap:0.5rem" href="https://wa.me/917017936338?text=Hi%20FIXIA!%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20a%20digital%20solution%20for%20my%20business." target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14c-.24.67-1.39 1.28-1.92 1.34-.51.06-1.17.09-3.79-.98-2.24-.92-3.69-3.21-3.8-3.36-.11-.15-.92-1.22-.92-2.33s.58-1.65.79-1.87c.21-.22.46-.28.61-.28.15 0 .31 0 .44.01.14.01.32-.05.5.38.18.43.62 1.51.67 1.62.05.11.08.24.01.38-.07.14-.11.23-.22.36-.11.13-.23.29-.33.39-.11.11-.23.23-.1.45.13.22.58.96 1.24 1.55.85.76 1.57 1 1.79 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.3-.18.5-.11.2.07 1.29.61 1.51.72.22.11.37.17.42.26.05.09.05.53-.19 1.2z"/></svg>
        Chat on WhatsApp
      </a>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-top:0.5rem;font:600 0.82rem var(--mono);color:rgba(255,255,255,0.7)">
        <a href="tel:+917017936338" style="color:inherit;text-decoration:none">📞 +91 70179 36338</a>
        <span>·</span>
        <a href="mailto:devloper@fixia.in" style="color:inherit;text-decoration:none">✉️ devloper@fixia.in</a>
      </div>
    </div>
  </div>
`);

/* Mobile Menu Toggle & Keyboard Accessibility */
const mobBtn = $('#mobBtn'), mobNav = $('#mobNav');
if (mobBtn && mobNav) {
  function setMobileMenu(open) {
    B.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    mobBtn.setAttribute('aria-expanded', String(open));
    mobNav.setAttribute('aria-hidden', String(!open));
  }

  mobBtn.addEventListener('click', () => {
    const isOpen = B.classList.contains('menu-open');
    setMobileMenu(!isOpen);
  });

  // Close when selecting any link
  mobNav.addEventListener('click', e => {
    if (e.target.closest('a')) {
      setMobileMenu(false);
    }
  });

  // Close when Escape is pressed
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && B.classList.contains('menu-open')) {
      setMobileMenu(false);
      mobBtn.focus();
    }
  });
}

/* Contextual WhatsApp Message Generator */
function getContextualWaMessage() {
  const p = (location.pathname || '').toLowerCase();
  const q = new URLSearchParams(location.search);
  if (p.includes('web.html')) return "Hi FIXIA! I'm interested in getting a website developed for my business.";
  if (p.includes('android.html')) return "Hi FIXIA! I'm interested in getting a mobile application developed for my business.";
  if (p.includes('software.html') || p.includes('erp.html')) return "Hi FIXIA! I want to discuss custom business software.";
  if (p.includes('ai.html')) return "Hi FIXIA! I'm interested in automating some of my business operations.";
  if (p.includes('pricing.html')) return "Hi FIXIA! I'd like to discuss a practical milestone estimate for my business.";
  if (p.includes('case-study-detail.html')) {
    const id = q.get('id');
    if (id) return `Hi FIXIA! I saw your ${id} case study and want to build something similar for my business.`;
    return "Hi FIXIA! I saw your client work and want to discuss a digital solution for my business.";
  }
  if (p.includes('ideas.html') || p.includes('results.html')) {
    const biz = q.get('biz');
    if (biz) return `Hi FIXIA! I'm looking for software ideas for my ${biz} business.`;
    return "Hi FIXIA! I want to discuss a digital solution for my business.";
  }
  if (p.includes('solution-builder.html')) return "Hi FIXIA! I'm using your Solution Builder and want to discuss a custom system.";
  return "Hi FIXIA! I visited your website and would like to discuss a digital solution for my business.";
}

const contextualWaUrl = `https://wa.me/917017936338?text=${encodeURIComponent(getContextualWaMessage())}`;

if (!B.dataset.noend) {
  B.insertAdjacentHTML('beforeend', `
    <div class="end-wrap"><div class="wrap">
      <section class="end finale">
        <h2 data-r>Have a business problem? <em>Let's build the solution.</em></h2>
        <div class="row">
          <p data-r>Tell us what your business needs. We'll help you find the right digital solution and provide a fixed milestone estimate.</p>
          <div class="end-actions">
            <a class="btn hi" href="contact.html">Discuss Your Project ${ic('arr')}</a>
            <a class="btn ghost" style="color:#fff;border-color:rgba(255,255,255,.35);display:inline-flex;align-items:center;gap:0.45rem" href="${contextualWaUrl}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14c-.24.67-1.39 1.28-1.92 1.34-.51.06-1.17.09-3.79-.98-2.24-.92-3.69-3.21-3.8-3.36-.11-.15-.92-1.22-.92-2.33s.58-1.65.79-1.87c.21-.22.46-.28.61-.28.15 0 .31 0 .44.01.14.01.32-.05.5.38.18.43.62 1.51.67 1.62.05.11.08.24.01.38-.07.14-.11.23-.22.36-.11.13-.23.29-.33.39-.11.11-.23.23-.1.45.13.22.58.96 1.24 1.55.85.76 1.57 1 1.79 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.3-.18.5-.11.2.07 1.29.61 1.51.72.22.11.37.17.42.26.05.09.05.53-.19 1.2z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div class="fin-steps"><span><b>01</b>30-min call</span><span><b>02</b>Blueprint in 48h</span><span><b>03</b>Weekly staging links</span><span><b>04</b>You own the code</span></div>
      </section>
    </div></div>
  `);
}

B.insertAdjacentHTML('beforeend', `
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <a class="logo" href="index.html" style="color:#fff;font-size:1.35rem;display:inline-flex"><svg class="mk" aria-hidden="true"><use href="#lg"/></svg><span class="wm">FIXIA</span></a>
          <p style="margin-top:0.75rem;line-height:1.55"><b style="color:#fff">Your Business. Smarter with Software.</b><br>We build custom websites, mobile apps, and business software with 100% source code ownership and zero monthly rent.</p>
          <div style="margin-top:1.25rem;display:flex;gap:0.75rem;flex-wrap:wrap">
            <a class="btn sm hi" href="contact.html">Discuss Your Project →</a>
            <a class="btn sm ghost" style="color:#fff;border-color:rgba(255,255,255,.3)" href="${contextualWaUrl}" target="_blank" rel="noopener noreferrer">WhatsApp Us ↗</a>
          </div>
        </div>
        <div class="foot-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="ideas.html">Solutions &amp; Blueprints</a></li>
            <li><a href="work.html">Work</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="pricing.html">Pricing</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h4>Get in Touch</h4>
          <ul>
            <li><a href="tel:+917017936338">📞 +91 70179 36338</a></li>
            <li><a href="mailto:devloper@fixia.in">✉️ devloper@fixia.in</a></li>
            <li><a href="https://www.instagram.com/fixia.official/" target="_blank" rel="noopener">📸 @fixia.official</a></li>
            <li><span style="color:#A39D90;font-size:0.86rem">Mon–Sat · 10am to 8pm IST</span></li>
          </ul>
        </div>
        <div class="foot-col">
          <h4>Social &amp; Chat</h4>
          <ul>
            <li><a href="${contextualWaUrl}" target="_blank" rel="noopener">💬 WhatsApp Chat ↗</a></li>
            <li><a href="https://www.instagram.com/fixia.official/" target="_blank" rel="noopener">📷 Instagram Profile ↗</a></li>
            <li><span style="color:#22C55E;font-size:0.86rem">● Direct engineering support</span></li>
            <li><span style="color:#A39D90;font-size:0.86rem">100% Source Code Ownership</span></li>
          </ul>
        </div>
      </div>
      <div class="foot-watermark" aria-hidden="true">FIXIA</div>
      <div class="foot-bottom">
        <span>© 2026 FIXIA. All rights reserved. fixia.in · <a href="mailto:devloper@fixia.in" style="color:inherit">devloper@fixia.in</a> · <a href="tel:+917017936338" style="color:inherit">+91 70179 36338</a></span>
        <button class="totop" type="button" onclick="scrollTo({top:0,behavior:'smooth'})">Back to top ↑</button>
      </div>
    </div>
  </footer>

  <!-- Desktop Floating WhatsApp Widget & Contact Panel -->
  <div class="fx-contact-widget" id="fxContactWidget">
    <div class="fx-contact-panel" id="fxContactPanel" role="dialog" aria-modal="false" aria-label="Direct Contact Channels">
      <div class="fx-panel-head">
        <div class="fx-panel-status">
          <span class="fx-live-dot"></span>
          <span><b>Engineering Online</b> · Fast Response</span>
        </div>
        <button type="button" class="fx-panel-close" id="fxPanelClose" aria-label="Close contact panel">✕</button>
      </div>
      <div class="fx-panel-body">
        <a class="fx-channel-card" href="${contextualWaUrl}" target="_blank" rel="noopener noreferrer">
          <div class="fx-channel-icon wa">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14c-.24.67-1.39 1.28-1.92 1.34-.51.06-1.17.09-3.79-.98-2.24-.92-3.69-3.21-3.8-3.36-.11-.15-.92-1.22-.92-2.33s.58-1.65.79-1.87c.21-.22.46-.28.61-.28.15 0 .31 0 .44.01.14.01.32-.05.5.38.18.43.62 1.51.67 1.62.05.11.08.24.01.38-.07.14-.11.23-.22.36-.11.13-.23.29-.33.39-.11.11-.23.23-.1.45.13.22.58.96 1.24 1.55.85.76 1.57 1 1.79 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.3-.18.5-.11.2.07 1.29.61 1.51.72.22.11.37.17.42.26.05.09.05.53-.19 1.2z"/></svg>
          </div>
          <div class="fx-channel-info">
            <div class="fx-channel-title">WhatsApp Chat <span class="fx-pill-fast">⚡ Instant</span></div>
            <div class="fx-channel-sub">+91 70179 36338</div>
          </div>
          <span class="fx-channel-arrow">→</span>
        </a>
        <a class="fx-channel-card" href="tel:+917017936338">
          <div class="fx-channel-icon call">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="fx-channel-info">
            <div class="fx-channel-title">Direct Phone Call</div>
            <div class="fx-channel-sub">+91 70179 36338</div>
          </div>
          <span class="fx-channel-arrow">→</span>
        </a>
        <a class="fx-channel-card" href="mailto:devloper@fixia.in">
          <div class="fx-channel-icon mail">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <div class="fx-channel-info">
            <div class="fx-channel-title">Official Email</div>
            <div class="fx-channel-sub">devloper@fixia.in</div>
          </div>
          <span class="fx-channel-arrow">→</span>
        </a>
        <a class="fx-channel-card" href="https://www.instagram.com/fixia.official/" target="_blank" rel="noopener noreferrer">
          <div class="fx-channel-icon ig">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </div>
          <div class="fx-channel-info">
            <div class="fx-channel-title">Instagram Updates</div>
            <div class="fx-channel-sub">@fixia.official</div>
          </div>
          <span class="fx-channel-arrow">→</span>
        </a>
        <a class="fx-channel-plan" href="contact.html">
          <span>Need a customized scope or formal estimate?</span>
          <b>Send Project Inquiry →</b>
        </a>
      </div>
    </div>
    <button type="button" class="fx-float-trigger" id="fxFloatTrigger" aria-label="Direct contact & WhatsApp channels" aria-expanded="false">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14c-.24.67-1.39 1.28-1.92 1.34-.51.06-1.17.09-3.79-.98-2.24-.92-3.69-3.21-3.8-3.36-.11-.15-.92-1.22-.92-2.33s.58-1.65.79-1.87c.21-.22.46-.28.61-.28.15 0 .31 0 .44.01.14.01.32-.05.5.38.18.43.62 1.51.67 1.62.05.11.08.24.01.38-.07.14-.11.23-.22.36-.11.13-.23.29-.33.39-.11.11-.23.23-.1.45.13.22.58.96 1.24 1.55.85.76 1.57 1 1.79 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.3-.18.5-.11.2.07 1.29.61 1.51.72.22.11.37.17.42.26.05.09.05.53-.19 1.2z"/></svg>
      <span class="fx-trigger-badge" aria-hidden="true">1</span>
    </button>
  </div>

  <!-- Mobile Sticky Bottom Contact Bar -->
  <div class="fx-mob-bottom-bar" id="fxMobBar" role="region" aria-label="Quick Contact Bar">
    <a class="fx-mob-btn wa" href="${contextualWaUrl}" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14c-.24.67-1.39 1.28-1.92 1.34-.51.06-1.17.09-3.79-.98-2.24-.92-3.69-3.21-3.8-3.36-.11-.15-.92-1.22-.92-2.33s.58-1.65.79-1.87c.21-.22.46-.28.61-.28.15 0 .31 0 .44.01.14.01.32-.05.5.38.18.43.62 1.51.67 1.62.05.11.08.24.01.38-.07.14-.11.23-.22.36-.11.13-.23.29-.33.39-.11.11-.23.23-.1.45.13.22.58.96 1.24 1.55.85.76 1.57 1 1.79 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.87.15-.22.3-.18.5-.11.2.07 1.29.61 1.51.72.22.11.37.17.42.26.05.09.05.53-.19 1.2z"/></svg>
      <span>WhatsApp</span>
    </a>
    <a class="fx-mob-btn call" href="tel:+917017936338">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span>Call</span>
    </a>
    <a class="fx-mob-btn cta" href="contact.html">
      <span>Discuss Project</span>
      <span class="arr" aria-hidden="true">→</span>
    </a>
  </div>

  <!-- Project Detail Modal -->
  <div class="proj-modal-backdrop" id="projModal" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="proj-modal-card">
      <button class="modal-close-btn" id="modalClose" aria-label="Close dialog">${ic('cls')}</button>
      <div class="modal-content" id="modalBody"></div>
    </div>
  </div>
`);

/* Floating Contact Widget Listeners */
const fxTrigger = $('#fxFloatTrigger'), fxPanel = $('#fxContactPanel'), fxClose = $('#fxPanelClose');
if (fxTrigger && fxPanel) {
  function toggleContactPanel(open) {
    const isCurrentlyOpen = fxPanel.classList.contains('open');
    const newState = typeof open === 'boolean' ? open : !isCurrentlyOpen;
    fxPanel.classList.toggle('open', newState);
    fxTrigger.setAttribute('aria-expanded', String(newState));
  }

  fxTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleContactPanel();
  });

  if (fxClose) {
    fxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleContactPanel(false);
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#fxContactWidget')) {
      toggleContactPanel(false);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fxPanel.classList.contains('open')) {
      toggleContactPanel(false);
      fxTrigger.focus();
    }
  });
}
}

/* Project Modal Handlers */
const modalBackdrop = $('#projModal'), modalBody = $('#modalBody');
function openProjectModal(id) {
  const p = REAL_PROJECTS.find(x => x.id === id);
  if (!p) return;
  modalBody.innerHTML = `
    <span class="proj-cat">${p.category}</span>
    <h2 style="font-size:clamp(1.8rem,3vw,2.5rem);margin-bottom:.5rem">${p.title}</h2>
    <p style="color:var(--mute);font-size:1.1rem;margin-bottom:1.5rem">${p.tagline}</p>
    <div class="modal-preview-box">
      ${renderBrowserFrame(p, true)}
    </div>
    <div class="modal-grid">
      <div>
        <div class="modal-section">
          <h4>01 — Overview</h4>
          <p>${p.overview}</p>
        </div>
        <div class="modal-section">
          <h4>02 — The Challenge</h4>
          <p>${p.challenge}</p>
        </div>
      </div>
      <div>
        <div class="modal-section">
          <h4>03 — What We Built</h4>
          <ul class="proj-highlights">
            ${p.whatWeBuilt.map(w => `<li>${ic('chk')}<span>${w}</span></li>`).join('')}
          </ul>
        </div>
        <div class="modal-section">
          <h4>04 — Real Outcome</h4>
          <p>${p.result}</p>
        </div>
      </div>
    </div>
    <div style="margin-top:2rem;display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;border-top:1px solid #EEF0F4;padding-top:1.5rem">
      <a class="btn" href="${p.url}" target="_blank" rel="noopener noreferrer">Visit Live Website ${ic('arr')}</a>
      <a class="btn ghost" href="case-study-detail.html?id=${p.id}">Deep-Dive Case Study ↗</a>
      <a class="btn ghost" href="contact.html?p=${encodeURIComponent('I want something like ' + p.title + '.')}">Build something like this</a>
    </div>
  `;
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if ($('#modalClose')) $('#modalClose').onclick = closeProjectModal;
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeProjectModal();
  });
}
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeProjectModal();
});

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-modal-id]');
  if (btn) {
    e.preventDefault();
    openProjectModal(btn.dataset.modalId);
  }
});

/* Reveal: words, blocks, counters */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const t = e.target;
  t.classList.add('in');
  io.unobserve(t);
  $$('[data-count]', t).concat(t.dataset.count ? [t] : []).forEach(c => tween(c, +c.dataset.count, c.dataset.f));
}), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

function rv(root = document) {
  $$('[data-split]', root).forEach(el => {
    if (el.dataset.s) return;
    el.dataset.s = 1;
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');
  });
  $$('[data-r],[data-split]', root).forEach(el => {
    if (el.dataset.o) return;
    el.dataset.o = 1;
    io.observe(el);
  });
}

function tween(el, to, f) {
  const fm = n => f === 'inr' ? inr(n) : Math.round(n).toLocaleString('en-IN') + (el.dataset.suf || '');
  const from = +el.dataset.cur || 0;
  const t0 = performance.now(), D = 1400;
  (function s(t) {
    const p = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - p, 4);
    const v = from + (to - from) * e;
    el.textContent = fm(v);
    el.dataset.cur = v;
    if (p < 1) requestAnimationFrame(s);
  })(t0);
}
rv();

/* Scroll: progress bar, header shadow, parallax, pinned horizontal section */
const hs = $('.hs'), tr = hs && $('.track', hs);
const header = $('header');
function onScroll() {
  const h = document.documentElement;
  const bar = $('#bar');
  if (bar) bar.style.transform = `scaleX(${scrollY / (h.scrollHeight - innerHeight || 1)})`;
  if (header) header.classList.toggle('scrolled', scrollY > 20);
  $$('[data-speed]').forEach(el => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--py', `${(r.top + r.height / 2 - innerHeight / 2) * -el.dataset.speed}px`);
  });
  if (hs && innerWidth > 900) {
    const r = hs.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (hs.offsetHeight - innerHeight)));
    tr.style.transform = `translateX(${-p * (tr.scrollWidth - tr.parentElement.clientWidth + 80)}px)`;
    const hsp = $('.hsp', hs);
    if (hsp) hsp.style.transform = `scaleX(${p})`;
  }
}
let tk = 0;
addEventListener('scroll', () => {
  if (!tk) {
    tk = 1;
    requestAnimationFrame(() => { onScroll(); tk = 0; });
  }
}, { passive: true });
addEventListener('resize', onScroll);
onScroll();

/* Native OS Cursor restored - decorative dot follower removed for clean, instant usability */
const cu = $('#cur');
if (cu) cu.remove();

/* Crisp page transitions */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href$=".html"], a[href*=".html?"]');
  if (!a || a.target || e.metaKey || e.ctrlKey || a.getAttribute('target') === '_blank') return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
  e.preventDefault();
  B.classList.add('out');
  setTimeout(() => location.href = a.href, 220);
});
addEventListener('pageshow', e => {
  if (e.persisted) B.classList.remove('out');
});
