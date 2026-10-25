const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cp = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--remote-allow-origins=*',
  '--disable-gpu',
  '--user-data-dir=C:\\Users\\hp\\AppData\\Local\\Temp\\fixia_chrome_inspect'
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

    // 1. Flexora
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'https://flexora-ivory.vercel.app/' });
    await new Promise(r => setTimeout(r, 4000));
    const flexoraData = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            title: document.title,
            sections: Array.from(document.querySelectorAll('section, h1, h2, h3')).map(s => ({
              tag: s.tagName,
              text: s.innerText ? s.innerText.substring(0, 50).replace(/\\n/g, ' ') : '',
              top: s.getBoundingClientRect().top + window.scrollY
            })),
            images: Array.from(document.querySelectorAll('img')).map(i => ({
              src: i.src.substring(0, 80),
              top: i.getBoundingClientRect().top + window.scrollY,
              width: i.naturalWidth,
              height: i.naturalHeight
            }))
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Flexora Analysis:', JSON.stringify(flexoraData.result.value, null, 2));

    // 2. Matrix Gym
    await send('Page.navigate', { url: 'https://www.matrixgym.in/' });
    await new Promise(r => setTimeout(r, 4000));
    const matrixData = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            title: document.title,
            sections: Array.from(document.querySelectorAll('section, h1, h2, h3, button, a')).map(s => ({
              tag: s.tagName,
              text: s.innerText ? s.innerText.substring(0, 50).replace(/\\n/g, ' ') : '',
              top: s.getBoundingClientRect().top + window.scrollY
            }))
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Matrix Gym Analysis:', JSON.stringify(matrixData.result.value, null, 2));

  } catch(e) {
    console.error(e);
  } finally {
    cp.kill();
    process.exit(0);
  }
}, 2000);
