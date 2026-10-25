const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\hp\\AppData\\Local\\Temp\\fixia_chrome_cap';

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    try { this.ws.close(); } catch(e) {}
  }
}

async function captureSite(url, siteId, customScript = null) {
  console.log(`\n=== Capturing ${siteId} (${url}) ===`);

  // Target for desktop (1440x900)
  const newTargetRes = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
  const target = await newTargetRes.json();
  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.ready;

  await client.send('Page.enable');
  await client.send('Runtime.enable');

  // Desktop capture (1440 x 900)
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await client.send('Page.navigate', { url });
  // Wait 4-6 seconds for network & scripts to finish mounting
  await new Promise(r => setTimeout(r, 4500));

  if (customScript) {
    await client.send('Runtime.evaluate', { expression: customScript });
    await new Promise(r => setTimeout(r, 1500));
  }

  // Ensure images are decoded
  await client.send('Runtime.evaluate', {
    expression: `
      (async () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        await Promise.all(imgs.map(img => img.decode ? img.decode().catch(() => {}) : Promise.resolve()));
      })()
    `,
    awaitPromise: true
  });
  await new Promise(r => setTimeout(r, 1000));

  const desktopShot = await client.send('Page.captureScreenshot', { format: 'png' });
  const desktopPath = path.resolve(`assets/projects/${siteId}-desktop.png`);
  fs.writeFileSync(desktopPath, Buffer.from(desktopShot.data, 'base64'));
  console.log(`Saved Desktop: ${desktopPath} (${fs.statSync(desktopPath).size} bytes)`);

  // Mobile capture (390 x 844)
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await client.send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
  await new Promise(r => setTimeout(r, 2000));

  if (customScript) {
    await client.send('Runtime.evaluate', { expression: customScript });
    await new Promise(r => setTimeout(r, 1000));
  }

  const mobileShot = await client.send('Page.captureScreenshot', { format: 'png' });
  const mobilePath = path.resolve(`assets/projects/${siteId}-mobile.png`);
  fs.writeFileSync(mobilePath, Buffer.from(mobileShot.data, 'base64'));
  console.log(`Saved Mobile: ${mobilePath} (${fs.statSync(mobilePath).size} bytes)`);

  client.close();
  await fetch(`http://localhost:9222/json/close/${target.id}`).catch(() => {});
}

async function main() {
  console.log('Starting headless Chrome on port 9222...');
  const cp = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--hide-scrollbars',
    `--user-data-dir=${userDataDir}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    // 1. Flexora - ensure lookbook, apparel cards, and activewear are loaded & visible
    await captureSite(
      'https://flexora-ivory.vercel.app/',
      'flexora',
      `
        // Scroll down slightly so products and imagery reveal, dismiss any modal
        window.scrollBy(0, 320);
        document.querySelectorAll('button, a').forEach(el => {
          if (el.textContent && el.textContent.includes('Accept')) el.click();
        });
      `
    );

    // 2. Matrix Gym - dismiss splash or scroll to programs and gym floor
    await captureSite(
      'https://www.matrixgym.in/',
      'matrix-gym',
      `
        // Check for enter button or splash overlay
        const enterBtn = Array.from(document.querySelectorAll('button, a, div')).find(el => 
          el.textContent && (el.textContent.includes('ENTER') || el.textContent.includes('START') || el.textContent.includes('GRIND'))
        );
        if (enterBtn) enterBtn.click();
        // Also scroll down past the intro fold to reveal the programs, equipment & gym interior
        window.scrollBy(0, 480);
      `
    );

    // 3. Balaji Properties
    await captureSite(
      'https://balajipropertiess.vercel.app/',
      'balaji-properties',
      `
        window.scrollBy(0, 200);
      `
    );

    // 4. Rocket 147
    await captureSite(
      'https://rocket-147.vercel.app/',
      'rocket-147',
      `
        window.scrollBy(0, 150);
      `
    );

    // 5. Pradeep Classes
    await captureSite(
      'https://pradeepclasses.in/',
      'pradeep-classes',
      `
        window.scrollBy(0, 180);
      `
    );

  } catch(err) {
    console.error('Capture failed:', err);
  } finally {
    cp.kill();
    console.log('Chrome closed.');
  }
}

main();
