const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outSvc = path.resolve('c:/Users/hp/.gemini/antigravity-ide/brain/3f08aaaa-8e7c-4958-86b3-eaa68c65f2b0/services_summary_verify.png');

spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1440,1400',
  '--virtual-time-budget=6000',
  `--screenshot=${outSvc}`,
  'http://localhost:5173/index.html#services'
], { timeout: 25000 });

console.log('Services captured:', fs.existsSync(outSvc) ? fs.statSync(outSvc).size : 0, 'bytes');
