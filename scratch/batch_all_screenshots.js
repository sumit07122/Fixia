const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\hp\\AppData\\Local\\Temp\\fixia_chrome_batch';

const jobs = [
  {
    id: 'flexora',
    url: 'https://flexora-ivory.vercel.app/',
    captureDesktop: false, // already done
    captureMobile: true,
    mobileWait: 4000
  },
  {
    id: 'matrix-gym',
    url: 'https://www.matrixgym.in/',
    captureDesktop: false, // already done
    captureMobile: true,
    mobileWait: 4000,
    prepScript: `
      document.querySelectorAll('.preloader, [class*="splash"], [class*="intro"]').forEach(el => el.remove());
      window.scrollTo(0, 100);
    `
  },
  {
    id: 'balaji-properties',
    url: 'https://balajipropertiess.vercel.app/',
    captureDesktop: true,
    captureMobile: true,
    desktopWait: 4500,
    mobileWait: 3500
  },
  {
    id: 'rocket-147',
    url: 'https://rocket-147.vercel.app/',
    captureDesktop: true,
    captureMobile: true,
    desktopWait: 4500,
    mobileWait: 3500
  },
  {
    id: 'pradeep-classes',
    url: 'https://pradeepclasses.in/',
    captureDesktop: true,
    captureMobile: true,
    desktopWait: 4500,
    mobileWait: 3500
  }
];

async function run() {
  console.log('Spawning Chrome on 9222...');
  const cp = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    '--disable-gpu',
    `--user-data-dir=${userDataDir}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    for (const job of jobs) {
      console.log(`\n>>> Capturing ${job.id}: ${job.url}`);
      const res = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
      const target = await res.json();
      const ws = new WebSocket(target.webSocketDebuggerUrl);
      await new Promise(r => ws.onopen = r);

      const send = (method, params = {}) => new Promise((resolve) => {
        const id = Math.floor(Math.random() * 1000000);
        const handler = (e) => {
          try {
            const msg = JSON.parse(e.data);
            if (msg.id === id) {
              ws.removeEventListener('message', handler);
              resolve(msg.result);
            }
          } catch(err) {}
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });

      // Desktop if requested
      if (job.captureDesktop) {
        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
        await send('Page.navigate', { url: job.url });
        await new Promise(r => setTimeout(r, job.desktopWait || 4000));
        if (job.prepScript) {
          await send('Runtime.evaluate', { expression: job.prepScript });
          await new Promise(r => setTimeout(r, 1000));
        }
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        const filePath = path.resolve(`assets/projects/${job.id}-desktop.png`);
        fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
        console.log(`[DESKTOP] ${job.id}: ${fs.statSync(filePath).size} bytes`);
      }

      // Mobile if requested
      if (job.captureMobile) {
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
        if (!job.captureDesktop) {
          await send('Page.navigate', { url: job.url });
        }
        await new Promise(r => setTimeout(r, job.mobileWait || 3500));
        if (job.prepScript) {
          await send('Runtime.evaluate', { expression: job.prepScript });
          await new Promise(r => setTimeout(r, 1000));
        }
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        const filePath = path.resolve(`assets/projects/${job.id}-mobile.png`);
        fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
        console.log(`[MOBILE] ${job.id}: ${fs.statSync(filePath).size} bytes`);
      }

      ws.close();
      await fetch(`http://localhost:9222/json/close/${target.id}`).catch(() => {});
    }
    console.log('\nAll captures successfully finished!');
  } catch(e) {
    console.error('Batch error:', e);
  } finally {
    cp.kill();
    process.exit(0);
  }
}

run();
