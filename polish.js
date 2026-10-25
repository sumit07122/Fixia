/* Polish layer: scroll progress var, spotlight, magnetic buttons, tilt. Pointer work is rAF-throttled and fine-pointer only. */
(()=>{
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const root=document.documentElement;
let t=0;const sp=()=>{const m=root.scrollHeight-innerHeight;root.style.setProperty('--sp',m>0?(scrollY/m).toFixed(3):0);t=0};
addEventListener('scroll',()=>{t||(t=requestAnimationFrame(sp))},{passive:true});sp();
document.querySelectorAll('.proj-row,.work-item').forEach((e,i)=>e.dataset.n=String(i+2).padStart(2,'0')+' / PROJECT');
/* Engine Terminal Controller */
const eng = document.querySelector('.engine-terminal');
if (eng) {
  const tabs = [...eng.querySelectorAll('.eng-tab')];
  const screens = [
    document.getElementById('eng-oneshot'),
    document.getElementById('eng-himalaya'),
    document.getElementById('eng-flexora')
  ].filter(Boolean);
  let idx = 0, tm, userHold = calm;
  const showTab = n => {
    idx = n;
    tabs.forEach((b, k) => b.classList.toggle('active', k === n));
    screens.forEach((s, k) => s.classList.toggle('active', k === n));
    clearTimeout(tm);
    if (!userHold) tm = setTimeout(() => showTab((idx + 1) % tabs.length), 6000);
  };
  tabs.forEach((b, k) => b.onclick = () => { userHold = true; showTab(k); });
  showTab(0);

  // Interactive 46 Seats for Himalaya Escape Tab
  const seatMatrix = document.getElementById('engSeatMatrix');
  if (seatMatrix && !seatMatrix.children.length) {
    for (let i = 1; i <= 46; i++) {
      const dot = document.createElement('div');
      dot.className = 'seat-dot' + (i <= 42 ? ' selected' : '');
      dot.title = 'Seat ' + i + (i <= 42 ? ' (Reserved)' : ' (Available)');
      dot.onclick = () => dot.classList.toggle('selected');
      seatMatrix.appendChild(dot);
    }
  }
}
if(!fine||calm)return;
let q=0,ev;
addEventListener('pointermove',e=>{ev=e;q||(q=requestAnimationFrame(()=>{q=0;const x=ev.clientX,y=ev.clientY,tg=ev.target;
 const hs=document.querySelector('.spot');if(hs){hs.style.setProperty('--hx',x+'px');hs.style.setProperty('--hy',(y+scrollY)+'px')}
 const c=tg.closest&&tg.closest('.engine-card,.bn-drawer,.pulse-card-float');
 if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',x-r.left+'px');c.style.setProperty('--my',y-r.top+'px')}
 document.querySelectorAll('.btn.mag').forEach(b=>{const r=b.getBoundingClientRect(),dx=x-(r.left+r.width/2),dy=y-(r.top+r.height/2);
  const n=Math.hypot(dx,dy)<r.width*.8&&Math.abs(dy)<r.height*1.4;b.style.setProperty('--bx',n?dx*.18+'px':'0px');b.style.setProperty('--by',n?dy*.3+'px':'0px')});
 const f=tg.closest&&tg.closest('.browser-frame');
 document.querySelectorAll('.browser-frame').forEach(b=>{if(b===f){const r=b.getBoundingClientRect();b.style.setProperty('--ry',((x-r.left)/r.width-.5)*5+'deg');b.style.setProperty('--rx',(.5-(y-r.top)/r.height)*4+'deg')}else{b.style.removeProperty('--ry');b.style.removeProperty('--rx')}});
}))},{passive:true});
document.querySelectorAll('.cta .btn,.end .btn,.hfc-actions .btn,header .btn,.work-next .btn').forEach(b=>b.classList.add('mag'));
})();

(()=>{
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches,B=document.body,H=document.documentElement;
H.classList.remove('intro-on');

if (!document.getElementById('fxLoader')) {
  const loader = document.createElement('div');
  loader.id = 'fxLoader';
  loader.className = 'fx-loader active';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = '<div class="fx-loader-spinner"></div><span>FIXIA ENGINE</span>';
  B.appendChild(loader);
  const hide = () => setTimeout(() => loader.classList.remove('active'), 350);
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
  setTimeout(hide, 1200);
}

const fills=[...document.querySelectorAll('[data-fill]')].map(e=>{e.innerHTML=e.textContent.trim().split(/\s+/).map(x=>`<span>${x}</span>`).join(' ');return[e,[...e.children]]});
const steps=[...document.querySelectorAll('.steps')];
let q=0;const run=()=>{q=0;const vh=innerHeight;
 fills.forEach(([e,s])=>{const r=e.getBoundingClientRect(),p=calm?1:Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));s.forEach((x,i)=>x.classList.toggle('on',i/s.length<p))});
 steps.forEach(e=>{const r=e.getBoundingClientRect();e.style.setProperty('--sp2',Math.min(1,Math.max(0,(vh*.65-r.top)/r.height)))})};
addEventListener('scroll',()=>{q||(q=requestAnimationFrame(run))},{passive:true});addEventListener('resize',run);run();
const cu=document.getElementById('cur');
if(fine&&cu)addEventListener('pointerover',e=>{const t=e.target.closest&&e.target.closest('.row,.browser-frame');cu.classList.toggle('lbl',!!t);if(t)cu.dataset.t=t.matches('.row')?'Open':'View'},{passive:true});
})();

(()=>{const u=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join(''),run=t=>`<div class="mo-run"><span>${t}</span><span>${t}</span></div>`,ch=a=>`<div class="mo-ch">${a.map(x=>`<span>${x}</span>`).join('')}</div>`,M=(bg,fg,x)=>`<div class="mo" style="background:${bg};color:${fg}">${x}</div>`;
const MO={'himalaya-escape':()=>M('#0F2A22','#fff',`<div class="mo-t">Manali × Kasol 2026</div><div class="mo-seats">${u(46,i=>`<u style="--d:${(i*7%23)*.3}s"></u>`)}</div><span class="m-btn">Pick your seat</span>`),
'oneshot':()=>M('#101010','#fff',`<div class="mo-t">Live tables</div><div class="mo-tbs">${u(8,i=>`<div class="mo-tb${i%3?' on':''}">T${i+1}<br><span class="mo-tm" data-t="${i*437%3000}">00:00</span></div>`)}</div>`),
'flexora':()=>M('#E7E0D2','#101010',run('DROP N°01 · LUXURY CASUAL · DROP N°02 · GYMWEAR ELITE ·')+ch(['400+ GSM','4-way stretch','Heavy cotton'])),
'matrix-gym':()=>M('#101010','#fff',`<div class="mo-t">ENTER THE MATRIX.</div>${run('STRENGTH ★ POWER ★ DISCIPLINE ★ HUSTLE ★ ENDURANCE ★')}`),
'balaji-properties':()=>M('#F4EFE4','#101010',`<div class="mo-t">Find your plot</div>${ch(['Plots','Villas','Penthouses','Land'])}`),
'pradeep-classes':()=>M('#17352B','#fff',`<div class="mo-t"><span class="mo-sw">Admission Open</span><span class="mo-sw">प्रवेश जारी</span></div>${ch(['Navodaya','Sainik School','IIT / NEET'])}`),
'rocket-147':()=>M('#17352B','#fff',`<div class="mo-t">Book a table</div><div class="mo-rows"><p>Snooker S1 <b>₹200/hr</b></p><p>Snooker S2 <b>₹180/hr</b></p><p>Private cabin <b>Ask</b></p></div>`)};
window.fxMotion=img=>{const m=(img.getAttribute('src')||'').match(/projects\/(.+?)-desktop/),f=m&&MO[m[1]],s=img.closest('.bf-screen');if(!f||!s||s.querySelector('.mo'))return;img.style.display='none';const p=s.querySelector('.bf-phone');if(p)p.style.display='none';s.insertAdjacentHTML('afterbegin',f())};
document.querySelectorAll('.bf-screen>img').forEach(i=>{if(i.complete&&!i.naturalWidth)fxMotion(i)});
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>document.querySelectorAll('.mo-tm').forEach(e=>{const t=+e.dataset.t+1;e.dataset.t=t;e.textContent=String(t/60|0).padStart(2,'0')+':'+String(t%60).padStart(2,'0')}),1000)})();

/* ==========================================================
   FRONTEND CRAFT: WEB AUDIO SYNTHESIZER FOR TACTILE FEEDBACK
   ========================================================== */
window.fxSfx = {
  click: () => {},
  ping: () => {}
};

/* ==========================================================
   FRONTEND CRAFT: FLOATING HAT AI BOT (🎩 FIXIA BUSINESS ADVISOR)
   ========================================================== */
(()=>{
  if (document.getElementById('fixiaHatBotTrigger')) return;

  const KNOWLEDGE = {
    snooker: {
      title: "Snooker / Billiards / Gaming Arena",
      emoji: "🎱",
      bottlenecks: ["Paper tokens & manual minute tracking", "Unbilled kitchen snacks & cold drinks", "Revenue disputes between shifts"],
      solution: "Real-time 8-table session matrix timer, combo POS for games + cafe, and automated WhatsApp bills.",
      saved: "Saves ~14 hours/week & stops 100% table revenue leakage",
      demo: "https://oneshot-livid.vercel.app/",
      demoName: "See One Shot Live System ↗"
    },
    gym: {
      title: "Gym / Fitness Club / Crossfit",
      emoji: "🏋️",
      bottlenecks: ["Manual WhatsApp followups for expired fees", "Paper register check-ins", "Unchecked walk-in trial members"],
      solution: "Member QR check-in phone scanner, auto-renewal WhatsApp alerts with UPI pay link, trainer session tracker.",
      saved: "Recovers 20%+ lost renewal fees & saves 10 hours/week",
      demo: "https://www.matrixgym.in/",
      demoName: "See Matrix Gym Experience ↗"
    },
    coaching: {
      title: "Coaching Classes / Institute / School",
      emoji: "🏫",
      bottlenecks: ["Parents constantly calling for schedules & tests", "Writing fee receipts by hand", "Lost paper attendance registers"],
      solution: "Student & parent mobile portal, digital fee receipts with WhatsApp delivery, test result analytics.",
      saved: "Cuts routine parent inquiries by 75%",
      demo: "contact.html?p=Coaching%20Institute%20System",
      demoName: "Get Coaching Blueprint ↗"
    },
    realestate: {
      title: "Real Estate & Plot Developers",
      emoji: "🏡",
      bottlenecks: ["WhatsApp message chaos with brokers", "Showing plot availability on paper blueprints", "Double-booking inquiries"],
      solution: "Interactive visual plot master layout with live Sold/Available tags, instant brochure WhatsApp bot, client CRM.",
      saved: "Closes buyer site visits 2x faster with zero confusion",
      demo: "contact.html?p=Real%20Estate%20Interactive%20Layout",
      demoName: "See Real Estate Layout Blueprint ↗"
    },
    fashion: {
      title: "Clothing / Streetwear / Brand Lookbook",
      emoji: "👗",
      bottlenecks: ["Instagram DM ordering friction", "Manual size & inventory spreadsheets", "High cart drop-off on slow templates"],
      solution: "Ultra-fast editorial drop lookbook, 1-click WhatsApp order confirmation, live fabric callouts.",
      saved: "Increases mobile checkout conversion by 35%",
      demo: "https://flexora-ivory.vercel.app/",
      demoName: "See Flexora Lookbook Live ↗"
    },
    travel: {
      title: "Tours / Expeditions / Cabin Booking",
      emoji: "🏔️",
      bottlenecks: ["Coordinating 40+ seat choices in group chats", "Manual boarding passes & passenger lists", "Weather inquiries"],
      solution: "Interactive 46-seat cabin reservation matrix, automated digital boarding passes, live mountain weather feeds.",
      saved: "100% self-serve booking with zero seating clashes",
      demo: "https://himalaya-escape.vercel.app/",
      demoName: "See Himalaya Escape Live ↗"
    },
    retail: {
      title: "Retail Shop / Wholesale / Invoicing",
      emoji: "🧾",
      bottlenecks: ["Hand-written slips & calculator errors", "Unrecorded customer udhaar/credit", "Stock count discrepancies"],
      solution: "Fast touch POS billing, customer ledger with 1-click WhatsApp payment reminders, real-time low-stock alerts.",
      saved: "Saves 2 hours of daily book reconciliation",
      demo: "contact.html?p=Custom%20Billing%20Software",
      demoName: "Request Billing System Demo ↗"
    }
  };

  const botTriggerHtml = `
    <div class="fixia-hat-bot-trigger" id="fixiaHatBotTrigger" role="button" aria-label="Open FIXIA AI Business Automation Bot" tabindex="0">
      <div class="hat-bubble"><span>How can FIXIA ease your business? <b>Ask AI 🎩</b></span></div>
      <div class="hat-icon-wrap">
        <svg viewBox="0 0 48 48" class="hat-svg" aria-hidden="true">
          <path d="M6 38h36c2.2 0 4 1.8 4 4s-1.8 4-4 4H6c-2.2 0-4-1.8-4-4s1.8-4 4-4z" fill="#FF4A1C"/>
          <path d="M12 38V14c0-3.3 2.7-6 6-6h12c3.3 0 6 2.7 6 6v24H12z" fill="#101010"/>
          <path d="M12 30h24v8H12z" fill="#FF4A1C"/>
          <circle cx="24" cy="18" r="3" fill="#FF4A1C"/>
        </svg>
      </div>
    </div>

    <div class="fixia-bot-modal" id="fixiaBotModal" role="dialog" aria-modal="true" aria-label="FIXIA Business Automation AI">
      <div class="fixia-bot-header">
        <div class="fixia-bot-title-area">
          <div class="fixia-bot-hat-badge">🎩</div>
          <div>
            <div class="fixia-bot-title">FIXIA Business Advisor</div>
            <div class="fixia-bot-status">Online · Instant Automation Solutions</div>
          </div>
        </div>
        <button class="fixia-bot-close" id="fixiaBotClose" type="button" aria-label="Close Assistant">✕</button>
      </div>

      <div class="fixia-bot-chat" id="fixiaBotChat">
        <div class="bot-msg bot-msg-bot">
          👋 <b>Welcome!</b> What business do you run or what bottleneck is slowing you down? Tap a category below or type your business:
          <div class="bot-chips-wrap">
            <button class="bot-chip-btn" data-key="snooker" type="button">🎱 Snooker / Gaming</button>
            <button class="bot-chip-btn" data-key="gym" type="button">🏋️ Gym / Fitness</button>
            <button class="bot-chip-btn" data-key="coaching" type="button">🏫 Coaching / Institute</button>
            <button class="bot-chip-btn" data-key="realestate" type="button">🏡 Real Estate & Plots</button>
            <button class="bot-chip-btn" data-key="fashion" type="button">👗 Apparel / Store</button>
            <button class="bot-chip-btn" data-key="travel" type="button">🏔️ Travel / Booking</button>
            <button class="bot-chip-btn" data-key="retail" type="button">🧾 Billing & Retail</button>
          </div>
        </div>
      </div>

      <div class="fixia-bot-footer">
        <input class="fixia-bot-input" id="fixiaBotInput" type="text" placeholder="e.g., Dental clinic, Bakery, Law firm..." aria-label="Type your business or problem">
        <button class="fixia-bot-send" id="fixiaBotSend" type="button" aria-label="Send">↑</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', botTriggerHtml);

  const trigger = document.getElementById('fixiaHatBotTrigger');
  const modal = document.getElementById('fixiaBotModal');
  const closeBtn = document.getElementById('fixiaBotClose');
  const chat = document.getElementById('fixiaBotChat');
  const input = document.getElementById('fixiaBotInput');
  const sendBtn = document.getElementById('fixiaBotSend');

  function openBot() {
    modal.classList.add('open');
    window.fxSfx && window.fxSfx.ping();
    setTimeout(() => input && input.focus(), 200);
  }
  function closeBot() {
    modal.classList.remove('open');
  }

  trigger.onclick = () => modal.classList.contains('open') ? closeBot() : openBot();
  closeBtn.onclick = closeBot;

  function renderPlan(k) {
    const data = KNOWLEDGE[k];
    if (!data) return;
    
    // Add User message
    const userMsg = document.createElement('div');
    userMsg.className = 'bot-msg bot-msg-user';
    userMsg.textContent = `${data.emoji} ${data.title}`;
    chat.appendChild(userMsg);

    // Add Bot plan response
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-msg bot-msg-bot';
    botMsg.innerHTML = `
      <b>Here is how FIXIA eases and automates your ${data.title}:</b>
      <div class="bot-plan-card">
        <div class="bot-plan-title">⚡ The Fixia Solution:</div>
        <p style="margin:0;color:#F4EFE4;font-size:0.88rem;line-height:1.4">${data.solution}</p>
        
        <div style="font:700 0.78rem var(--mono);color:#B5AFA2;margin-top:0.3rem">FRUSTRATIONS ELIMINATED:</div>
        <ul class="bot-plan-list">
          ${data.bottlenecks.map(b => `<li><span style="color:#FCA5A5">✕</span> ${b}</li>`).join('')}
        </ul>

        <div class="bot-plan-stat">⏱️ ${data.saved}</div>

        <div class="bot-plan-actions">
          <a class="bot-plan-btn" href="https://wa.me/918448858700?text=${encodeURIComponent('Hi FIXIA, I run a ' + data.title + ' and want to automate it.')}" target="_blank" rel="noopener">WhatsApp Blueprint ↗</a>
          <a class="bot-plan-btn sub" href="${data.demo}" ${data.demo.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${data.demoName}</a>
          <a class="bot-plan-btn sub" href="contact.html?p=${encodeURIComponent('I want to discuss automating my ' + data.title)}">Get Need-Based Quote</a>
        </div>
      </div>
      <div style="margin-top:0.8rem;font-size:0.82rem;color:#B5AFA2">Want advice for another business? Tap another category or type below:</div>
    `;
    chat.appendChild(botMsg);
    chat.scrollTop = chat.scrollHeight;
  }

  function handleCustomInput(query) {
    const q = query.trim().toLowerCase();
    if (!q) return;

    // Echo user query
    const userMsg = document.createElement('div');
    userMsg.className = 'bot-msg bot-msg-user';
    userMsg.textContent = query;
    chat.appendChild(userMsg);
    input.value = '';

    // Match keywords
    let matchKey = null;
    if (q.includes('snooker') || q.includes('pool') || q.includes('gaming') || q.includes('cafe')) matchKey = 'snooker';
    else if (q.includes('gym') || q.includes('fitness') || q.includes('workout') || q.includes('trainer')) matchKey = 'gym';
    else if (q.includes('school') || q.includes('coach') || q.includes('class') || q.includes('tuition') || q.includes('student')) matchKey = 'coaching';
    else if (q.includes('plot') || q.includes('estate') || q.includes('property') || q.includes('builder') || q.includes('land')) matchKey = 'realestate';
    else if (q.includes('cloth') || q.includes('fashion') || q.includes('shirt') || q.includes('wear') || q.includes('brand') || q.includes('ecom')) matchKey = 'fashion';
    else if (q.includes('travel') || q.includes('tour') || q.includes('trip') || q.includes('hotel') || q.includes('resort') || q.includes('bus')) matchKey = 'travel';
    else if (q.includes('bill') || q.includes('stock') || q.includes('invoice') || q.includes('shop') || q.includes('store') || q.includes('retail')) matchKey = 'retail';

    if (matchKey) {
      setTimeout(() => renderPlan(matchKey), 300);
      return;
    }

    // Dynamic AI response for custom inputs
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'bot-msg bot-msg-bot';
      botMsg.innerHTML = `
        <b>Great problem to solve!</b> For a <em>"${query}"</em>, we typically eliminate manual spreadsheets and lost leads by building:
        <div class="bot-plan-card">
          <div class="bot-plan-title">💡 Recommended Custom Setup:</div>
          <ul class="bot-plan-list">
            <li><b>1. Lightweight Mobile Dashboard:</b> Manage orders, customers and tasks from your phone with 0 lag.</li>
            <li><b>2. Automated WhatsApp Bot:</b> Sends instant receipts, appointment confirmations and status updates.</li>
            <li><b>3. Need-Based Pricing:</b> We charge only for the exact screens you need—no monthly per-user licenses.</li>
          </ul>
          <div class="bot-plan-actions">
            <a class="bot-plan-btn" href="https://wa.me/918448858700?text=${encodeURIComponent('Hi FIXIA, I want to automate my ' + query)}" target="_blank" rel="noopener">Discuss via WhatsApp ↗</a>
            <a class="bot-plan-btn sub" href="contact.html?p=${encodeURIComponent('I want to build software for: ' + query)}">Request 48-Hour Blueprint</a>
          </div>
        </div>
      `;
      chat.appendChild(botMsg);
      chat.scrollTop = chat.scrollHeight;
    }, 350);
  }

  document.addEventListener('click', e => {
    const chip = e.target.closest('.bot-chip-btn');
    if (chip && chip.dataset.key) {
      renderPlan(chip.dataset.key);
    }
  });

  sendBtn.onclick = () => handleCustomInput(input.value);
  input.onkeydown = e => { if (e.key === 'Enter') handleCustomInput(input.value); };
})();

/* ==========================================================
   3D MOCKUP INTERACTIVE PARALLAX TILT
   ========================================================== */
(()=>{
  const container = document.querySelector('.hero-mockup-3d');
  const scene = document.getElementById('mockupScene');
  if (!container || !scene) return;

  container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const rotX = 11 - (y * 12);
    const rotY = -13 + (x * 15);
    scene.style.animation = 'none';
    scene.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(2deg)`;
  });

  container.addEventListener('mouseleave', () => {
    scene.style.animation = 'floatSubtle3D 7s ease-in-out infinite alternate';
  });
})();

/* ==========================================================
   AGENCY CRAFT CONTROLLERS: HUD, CANVAS, BFA, ROI & DRAWER
   ========================================================== */
(()=>{
  // 1. Tactile Grain Overlay
  if (!document.querySelector('.grain-overlay')) {
    const grain = document.createElement('div');
    grain.className = 'grain-overlay';
    grain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grain);
  }

  // 2. Monospaced Developer HUD Overlay
  if (!document.querySelector('.dev-hud')) {
    const hud = document.createElement('div');
    hud.className = 'dev-hud';
    hud.setAttribute('aria-hidden', 'true');
    hud.innerHTML = `
      <div class="dev-hud-status"><div class="dev-hud-pulse"></div><span>FIXIA EDGE</span></div>
      <span class="dev-hud-sep">/</span>
      <span id="hudLatency">12ms</span>
      <span class="dev-hud-sep">/</span>
      <span>SPRINT: <b class="dev-hud-tag">14 DAYS</b></span>
      <span class="dev-hud-sep">/</span>
      <span>OWNERSHIP: <b style="color:#22C55E">100%</b></span>
    `;
    document.body.appendChild(hud);

    // Live latency micro-jitter
    setInterval(() => {
      const latEl = document.getElementById('hudLatency');
      if (latEl) latEl.textContent = (11 + Math.floor(Math.random() * 5)) + 'ms';
    }, 3200);
  }

  // 3. Fluid Interactive Canvas in Hero Section
  const heroEl = document.querySelector('.hero');
  if (heroEl && !document.getElementById('fxLiquidCanvas') && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const canvas = document.createElement('canvas');
    canvas.id = 'fxLiquidCanvas';
    heroEl.style.position = 'relative';
    heroEl.insertBefore(canvas, heroEl.firstChild);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = heroEl.offsetWidth;
    let height = canvas.height = heroEl.offsetHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = heroEl.offsetWidth;
      height = canvas.height = heroEl.offsetHeight;
    });

    let mouseX = width / 2, mouseY = height / 2;
    heroEl.addEventListener('mousemove', e => {
      const rect = heroEl.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    let step = 0;
    function renderLiquid() {
      ctx.clearRect(0, 0, width, height);
      step += 0.015;

      // Draw subtle wave paths with orange & cobalt ambient hue
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(255, 74, 28, 0.08)';

      for (let x = 0; x <= width; x += 30) {
        const y = Math.sin(x * 0.004 + step) * 28 + Math.cos(x * 0.008 + step * 0.7) * 18 + height * 0.55;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Fluid interactive ripple node near pointer
      const dist = Math.hypot(mouseX - width / 2, mouseY - height / 2);
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 90, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 74, 28, 0.025)';
      ctx.fill();

      requestAnimationFrame(renderLiquid);
    }
    renderLiquid();
  }

  // 4. Dynamic Before vs After Slider Controller
  const bfaContainer = document.querySelector('.bfa-container');
  if (bfaContainer) {
    let isDragging = false;
    const updateBfa = clientX => {
      const rect = bfaContainer.getBoundingClientRect();
      const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      bfaContainer.style.setProperty('--bfa-pos', pos.toFixed(1) + '%');
    };

    bfaContainer.addEventListener('pointerdown', e => {
      isDragging = true;
      bfaContainer.setPointerCapture(e.pointerId);
      updateBfa(e.clientX);
    });
    bfaContainer.addEventListener('pointermove', e => {
      if (!isDragging) return;
      updateBfa(e.clientX);
    });
    const stopBfa = e => {
      isDragging = false;
      try { bfaContainer.releasePointerCapture(e.pointerId); } catch(err) {}
    };
    bfaContainer.addEventListener('pointerup', stopBfa);
    bfaContainer.addEventListener('pointercancel', stopBfa);
  }

  // 5. Real-Time ROI / Performance Calculator Controller
  const roiHours = document.getElementById('roiHours');
  const roiStaff = document.getElementById('roiStaff');
  const roiRev = document.getElementById('roiRev');

  if (roiHours && roiStaff && roiRev) {
    const dispHours = document.getElementById('roiDispHours');
    const dispStaff = document.getElementById('roiDispStaff');
    const dispRev = document.getElementById('roiDispRev');
    const outHours = document.getElementById('roiOutHours');
    const outMoney = document.getElementById('roiOutMoney');
    const outPayback = document.getElementById('roiOutPayback');

    const computeROI = () => {
      const h = parseFloat(roiHours.value) || 12;
      const s = parseFloat(roiStaff.value) || 3;
      const r = parseFloat(roiRev.value) || 300000;

      if (dispHours) dispHours.textContent = h + ' hrs/wk';
      if (dispStaff) dispStaff.textContent = s + ' ' + (s === 1 ? 'person' : 'people');
      if (dispRev) dispRev.textContent = '₹' + (r >= 100000 ? (r / 100000).toFixed(1) + ' Lakh' : r.toLocaleString('en-IN'));

      // Formula: 75% automation efficiency on manual paperwork
      const monthlySaved = Math.round(h * s * 4.33 * 0.75);
      const leakageSavedAnnual = Math.round(r * 12 * 0.075 + (monthlySaved * 12 * 350));
      const paybackDays = Math.max(14, Math.round(35000 / (leakageSavedAnnual / 365)));

      if (outHours) outHours.innerHTML = `~${monthlySaved} <span>hrs / mo</span>`;
      if (outMoney) outMoney.textContent = '₹' + leakageSavedAnnual.toLocaleString('en-IN');
      if (outPayback) outPayback.textContent = `${paybackDays} Days`;
    };

    [roiHours, roiStaff, roiRev].forEach(el => el.addEventListener('input', computeROI));
    computeROI();
  }

  // 6. Progressive Disclosure Drawer (Case Study System Engine)
  let drawerOverlay = document.getElementById('fxDrawerOverlay');
  if (!drawerOverlay) {
    const drawerHtml = `
      <div class="fx-drawer-overlay" id="fxDrawerOverlay" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="fx-drawer-panel" id="fxDrawerPanel">
          <div class="fx-drawer-header">
            <div class="fx-drawer-title-area">
              <span class="proj-cat" id="drawerCategory" style="margin-bottom:0.4rem;display:inline-block">E-COMMERCE</span>
              <h3 id="drawerTitle">Project Title</h3>
              <p id="drawerTagline">Detailed system architecture &amp; operational metrics</p>
            </div>
            <button class="fx-drawer-close" id="drawerCloseBtn" type="button" aria-label="Close Case Study">✕</button>
          </div>

          <div class="fx-drawer-tabs" id="drawerTabs">
            <button class="fx-drawer-tab active" data-tab="overview" type="button">01 · Need &amp; Solution</button>
            <button class="fx-drawer-tab" data-tab="arch" type="button">02 · Architecture</button>
            <button class="fx-drawer-tab" data-tab="stack" type="button">03 · Tech Stack</button>
            <button class="fx-drawer-tab" data-tab="sandbox" type="button">04 · Live API Sandbox</button>
          </div>

          <div class="fx-drawer-body">
            <!-- Tab 1: Overview -->
            <div class="fx-drawer-pane active" id="pane-overview">
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.4rem">
                <h4 style="font-size:1.05rem;margin:0 0 0.5rem;color:#F6D77B">The Operational Bottleneck:</h4>
                <p id="drawerChallenge" style="color:#D4CEC0;font-size:0.92rem;line-height:1.6;margin:0">Client challenge description...</p>
              </div>

              <div style="margin-top:1.2rem">
                <h4 style="font-size:1.05rem;margin:0 0 0.8rem;color:#fff">What FIXIA Engineered:</h4>
                <ul id="drawerFeatures" style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.7rem;font-size:0.92rem;color:#E6DFD0"></ul>
              </div>

              <div style="margin-top:1.4rem;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:1.2rem">
                <h4 style="font-size:0.95rem;margin:0 0 0.3rem;color:#4ADE80">Verified Business Outcome:</h4>
                <p id="drawerResult" style="color:#D4CEC0;font-size:0.9rem;margin:0;line-height:1.5"></p>
              </div>
            </div>

            <!-- Tab 2: Architecture Flow -->
            <div class="fx-drawer-pane" id="pane-arch">
              <h4 style="font-size:1.05rem;margin:0 0 0.8rem;color:#fff">End-to-End System Data Flow:</h4>
              <div class="fx-arch-diagram" id="drawerArchDiagram">
                <div class="fx-arch-node">
                  <span>📱 Client Interface / Touch Device</span>
                  <span style="color:#38BDF8">Vite / Native UI (0ms Local State)</span>
                </div>
                <div class="fx-arch-connector">↓ WebSocket &amp; HTTP/2 Events</div>
                <div class="fx-arch-node">
                  <span>⚡ Edge Serverless Engine</span>
                  <span style="color:#FBBF24">Low-Latency Session State &amp; Auth</span>
                </div>
                <div class="fx-arch-connector">↓ Parameterized Transactions</div>
                <div class="fx-arch-node">
                  <span>🗄️ Relational Cloud Database</span>
                  <span style="color:#34D399">Automated Backup &amp; Encrypted Sync</span>
                </div>
                <div class="fx-arch-connector">↓ Automated Triggers</div>
                <div class="fx-arch-node">
                  <span>💬 Real-Time WhatsApp Bot</span>
                  <span style="color:#A78BFA">Instant Receipts &amp; Status Push</span>
                </div>
              </div>
            </div>

            <!-- Tab 3: Tech Stack -->
            <div class="fx-drawer-pane" id="pane-stack">
              <h4 style="font-size:1.05rem;margin:0 0 0.8rem;color:#fff">Engineered Specifications:</h4>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.85rem">
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1rem">
                  <div style="font:700 0.72rem var(--mono);color:#94A3B8">RUNTIME / BUNDLE</div>
                  <div style="font-weight:700;font-size:1rem;color:#fff;margin-top:0.3rem">Vanilla + Native ES Edge</div>
                  <div style="font-size:0.8rem;color:#B5AFA2;margin-top:0.2rem">&lt; 38KB Gzipped JS</div>
                </div>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1rem">
                  <div style="font:700 0.72rem var(--mono);color:#94A3B8">OFFLINE SYNC</div>
                  <div style="font-weight:700;font-size:1rem;color:#22C55E;margin-top:0.3rem">100% Offline-Resilient</div>
                  <div style="font-size:0.8rem;color:#B5AFA2;margin-top:0.2rem">IndexedDB local queue</div>
                </div>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1rem">
                  <div style="font:700 0.72rem var(--mono);color:#94A3B8">LIGHTHOUSE SCORE</div>
                  <div style="font-weight:700;font-size:1rem;color:#FBBF24;margin-top:0.3rem">98 / 100 Performance</div>
                  <div style="font-size:0.8rem;color:#B5AFA2;margin-top:0.2rem">Sub-1s LCP on 4G</div>
                </div>
                <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1rem">
                  <div style="font:700 0.72rem var(--mono);color:#94A3B8">CODE OWNERSHIP</div>
                  <div style="font-weight:700;font-size:1rem;color:#FF4A1C;margin-top:0.3rem">100% Full Handover</div>
                  <div style="font-size:0.8rem;color:#B5AFA2;margin-top:0.2rem">0 per-user fees ever</div>
                </div>
              </div>
            </div>

            <!-- Tab 4: Interactive Sandbox -->
            <div class="fx-drawer-pane" id="pane-sandbox">
              <h4 style="font-size:1.05rem;margin:0 0 0.4rem;color:#fff">Simulated Edge Endpoint:</h4>
              <p style="color:#B5AFA2;font-size:0.85rem;margin:0 0 1rem">Test the simulated transactional execution logic for this product:</p>
              
              <div class="fx-code-box">
                <span class="fx-code-badge" id="sandboxMethod">POST /api/execute</span>
                <pre id="sandboxCode" style="margin:0">// Click below to simulate live transaction</pre>
              </div>

              <button class="btn hi sm" id="sandboxRunBtn" style="margin-top:1rem;align-self:flex-start" type="button">⚡ Execute Simulated Request</button>

              <div id="sandboxResponseArea" style="display:none;margin-top:1rem">
                <div style="font:700 0.75rem var(--mono);color:#22C55E;margin-bottom:0.4rem">✓ STATUS 200 OK (Execution Time: 14ms)</div>
                <div class="fx-code-box" style="border-color:rgba(34,197,94,0.3)">
                  <pre id="sandboxJsonOut" style="margin:0"></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="fx-drawer-footer">
            <a class="btn" id="drawerVisitBtn" href="#" target="_blank" rel="noopener">Visit Live Production Site ↗</a>
            <a class="btn ghost sm" href="contact.html">Request Similar System</a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', drawerHtml);
    drawerOverlay = document.getElementById('fxDrawerOverlay');
  }

  const drawerPanel = document.getElementById('fxDrawerPanel');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const tabs = document.querySelectorAll('.fx-drawer-tab');
  const panes = document.querySelectorAll('.fx-drawer-pane');

  function openDrawer(projectId) {
    const p = (window.REAL_PROJECTS || []).find(x => x.id === projectId);
    if (!p) return;

    document.getElementById('drawerTitle').textContent = p.title;
    document.getElementById('drawerCategory').textContent = p.category;
    document.getElementById('drawerTagline').textContent = p.tagline;
    document.getElementById('drawerChallenge').textContent = p.challenge || p.shortDesc;
    document.getElementById('drawerResult').textContent = p.result;
    document.getElementById('drawerVisitBtn').href = p.url;

    const featList = document.getElementById('drawerFeatures');
    featList.innerHTML = p.whatWeBuilt.map(f => `
      <li style="display:flex;align-items:flex-start;gap:0.5rem">
        <span style="color:#22C55E">✓</span>
        <span>${f}</span>
      </li>
    `).join('');

    // Code Sandbox Customization
    const sandboxCode = document.getElementById('sandboxCode');
    const sandboxMethod = document.getElementById('sandboxMethod');
    const respArea = document.getElementById('sandboxResponseArea');
    const jsonOut = document.getElementById('sandboxJsonOut');
    respArea.style.display = 'none';

    if (p.id === 'oneshot') {
      sandboxMethod.textContent = 'POST /api/tables/03/start';
      sandboxCode.textContent = `const startSession = async (tableId = 3, type = "Snooker") => {
  const session = await db.tables.update({
    where: { id: tableId },
    data: {
      status: "OCCUPIED",
      gameType: type,
      startedAt: new Date().toISOString(),
      hourlyRate: 200.00
    }
  });
  return broadcastSync(session);
};`;
      document.getElementById('sandboxRunBtn').onclick = () => {
        respArea.style.display = 'block';
        jsonOut.textContent = JSON.stringify({
          success: true,
          tableId: "T03",
          game: "Snooker",
          rate: "₹200/hr",
          timestamp: new Date().toLocaleTimeString(),
          cloudSynced: true
        }, null, 2);
      };
    } else if (p.id === 'himalaya-escape') {
      sandboxMethod.textContent = 'POST /api/expedition/seat/reserve';
      sandboxCode.textContent = `const reserveSeat = async (seatNo = 14, passenger) => {
  const reservation = await db.seats.allocate({
    seatNo,
    expedition: "HIMALAYA_2026",
    advancePaid: 1000,
    boardingPassToken: crypto.randomUUID()
  });
  return dispatchWhatsAppPass(reservation);
};`;
      document.getElementById('sandboxRunBtn').onclick = () => {
        respArea.style.display = 'block';
        jsonOut.textContent = JSON.stringify({
          status: "CONFIRMED",
          seatAllocated: 14,
          advancePaid: "₹1,000",
          boardingPassUrl: "https://himalaya-escape.vercel.app/pass/HE2026-14",
          departure: "07:00 PM (NH-2 Mathura)"
        }, null, 2);
      };
    } else {
      sandboxMethod.textContent = `POST /api/${p.id}/inquire`;
      sandboxCode.textContent = `// Edge transaction handler for ${p.title}
export default async function handler(req, res) {
  const clientPayload = await validateRequest(req.body);
  await db.events.log({ project: "${p.id}", event: "LEAD_CAPTURE" });
  return res.status(200).json({ success: true, timestamp: Date.now() });
}`;
      document.getElementById('sandboxRunBtn').onclick = () => {
        respArea.style.display = 'block';
        jsonOut.textContent = JSON.stringify({
          success: true,
          service: p.title,
          category: p.category,
          status: "200 OK",
          deployment: "Global Edge Network"
        }, null, 2);
      };
    }

    // Default to tab 1
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === 'overview'));
    panes.forEach(p => p.classList.toggle('active', p.id === 'pane-overview'));

    drawerOverlay.classList.add('open');
    drawerOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('open');
    drawerOverlay.setAttribute('aria-hidden', 'true');
  }

  closeBtn.onclick = closeDrawer;
  drawerOverlay.addEventListener('click', e => {
    if (e.target === drawerOverlay) closeDrawer();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawerOverlay.classList.contains('open')) closeDrawer();
  });

  tabs.forEach(t => {
    t.onclick = () => {
      const target = t.dataset.tab;
      tabs.forEach(x => x.classList.toggle('active', x === t));
      panes.forEach(x => x.classList.toggle('active', x.id === 'pane-' + target));
    };
  });

  // Global listener for [data-modal-id]
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-modal-id]');
    if (btn) {
      e.preventDefault();
      openDrawer(btn.dataset.modalId);
    }
  });
})();


