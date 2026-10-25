const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cp = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--remote-allow-origins=*',
  '--disable-gpu',
  '--user-data-dir=C:\\Users\\hp\\AppData\\Local\\Temp\\fixia_chrome_test_shots'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
    const target = await res.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    const send = (method, params = {}) => new Promise(res => {
      const id = Math.floor(Math.random() * 100000);
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          res(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });

    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

    // 1. Flexora
    await send('Page.navigate', { url: 'https://flexora-ivory.vercel.app/' });
    await new Promise(r => setTimeout(r, 4500));
    // Check if hero image is visible or scroll to collections
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
    await new Promise(r => setTimeout(r, 1000));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/flexora_scroll0.png', Buffer.from(shot.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1150);' });
    await new Promise(r => setTimeout(r, 2000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/flexora_scroll1150.png', Buffer.from(shot.data, 'base64'));

    // 2. Matrix Gym
    await send('Page.navigate', { url: 'https://www.matrixgym.in/' });
    await new Promise(r => setTimeout(r, 4000));
    // Dismiss splash or wait
    await send('Runtime.evaluate', {
      expression: `
        // Click splash or remove preloader if present
        const preloader = document.querySelector('.preloader, [class*="splash"], [class*="intro"]');
        if (preloader) preloader.style.display = 'none';
        window.scrollTo(0, 150);
      `
    });
    await new Promise(r => setTimeout(r, 2000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/matrix_scroll150.png', Buffer.from(shot.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1300);' });
    await new Promise(r => setTimeout(r, 2000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/matrix_scroll1300.png', Buffer.from(shot.data, 'base64'));

    console.log('Finished capturing test variations.');
  } catch(e) {
    console.error(e);
  } finally {
    cp.kill();
    process.exit(0);
  }
}, 2000);
