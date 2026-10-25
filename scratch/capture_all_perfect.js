const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\hp\\AppData\\Local\\Temp\\fixia_chrome_perfect';

async function main() {
  console.log('Launching headless Chrome on 9222...');
  const cp = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--hide-scrollbars',
    `--user-data-dir=${userDataDir}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const sendCDP = (ws, method, params = {}) => new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const timeout = setTimeout(() => {
      ws.removeEventListener('message', handler);
      reject(new Error(`Timeout on ${method}`));
    }, 15000);

    const handler = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.id === id) {
          clearTimeout(timeout);
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      } catch (err) {}
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const targets = [
    {
      id: 'flexora',
      url: 'https://flexora-ivory.vercel.app/',
      desktopScroll: 0,
      mobileScroll: 0,
      waitMs: 5000,
      prepScript: `
        // Ensure hero lookbook is ready
        window.scrollTo(0, 50);
        setTimeout(() => window.scrollTo(0, 0), 200);
      `
    },
    {
      id: 'matrix-gym',
      url: 'https://www.matrixgym.in/',
      desktopScroll: 20,
      mobileScroll: 20,
      waitMs: 4000,
      prepScript: `
        // Remove intro preloader / splash overlay
        document.querySelectorAll('.preloader, [class*="splash"], [class*="intro"], #preloader').forEach(el => el.remove());
        const splashEl = Array.from(document.querySelectorAll('div')).find(d => 
          window.getComputedStyle(d).position === 'fixed' && 
          parseInt(window.getComputedStyle(d).zIndex) > 50 &&
          d.offsetHeight >= window.innerHeight * 0.8
        );
        if (splashEl) splashEl.remove();
        window.scrollTo(0, 20);
      `
    },
    {
      id: 'balaji-properties',
      url: 'https://balajipropertiess.vercel.app/',
      desktopScroll: 0,
      mobileScroll: 0,
      waitMs: 4000,
      prepScript: `
        window.scrollTo(0, 0);
      `
    },
    {
      id: 'rocket-147',
      url: 'https://rocket-147.vercel.app/',
      desktopScroll: 0,
      mobileScroll: 0,
      waitMs: 4000,
      prepScript: `
        window.scrollTo(0, 0);
      `
    },
    {
      id: 'pradeep-classes',
      url: 'https://pradeepclasses.in/',
      desktopScroll: 0,
      mobileScroll: 0,
      waitMs: 4000,
      prepScript: `
        window.scrollTo(0, 0);
      `
    }
  ];

  try {
    for (const item of targets) {
      console.log(`\n========================================`);
      console.log(`Processing ${item.id}: ${item.url}`);
      console.log(`========================================`);

      const targetRes = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
      const targetData = await targetRes.json();
      const ws = new WebSocket(targetData.webSocketDebuggerUrl);
      await new Promise(r => ws.onopen = r);

      // 1. Desktop (1440 x 900)
      await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });
      await sendCDP(ws, 'Page.navigate', { url: item.url });
      console.log(`Navigated to ${item.url}, waiting ${item.waitMs}ms...`);
      await new Promise(r => setTimeout(r, item.waitMs));

      if (item.prepScript) {
        await sendCDP(ws, 'Runtime.evaluate', { expression: item.prepScript });
        await new Promise(r => setTimeout(r, 1200));
      }

      const desktopShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
      const destDesktop = path.resolve(`assets/projects/${item.id}-desktop.png`);
      fs.writeFileSync(destDesktop, Buffer.from(desktopShot.data, 'base64'));
      console.log(`✓ Saved ${item.id} Desktop (${fs.statSync(destDesktop).size} bytes)`);

      // 2. Mobile (390 x 844)
      await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true
      });
      await new Promise(r => setTimeout(r, 2000));
      if (item.prepScript) {
        await sendCDP(ws, 'Runtime.evaluate', { expression: item.prepScript });
        await new Promise(r => setTimeout(r, 1200));
      }

      const mobileShot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
      const destMobile = path.resolve(`assets/projects/${item.id}-mobile.png`);
      fs.writeFileSync(destMobile, Buffer.from(mobileShot.data, 'base64'));
      console.log(`✓ Saved ${item.id} Mobile (${fs.statSync(destMobile).size} bytes)`);

      ws.close();
      await fetch(`http://localhost:9222/json/close/${targetData.id}`).catch(() => {});
    }

    console.log('\nAll projects successfully re-captured!');
  } catch(err) {
    console.error('Capture pipeline error:', err);
  } finally {
    cp.kill();
    process.exit(0);
  }
}

main();
