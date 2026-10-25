const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outHero = path.resolve('c:/Users/hp/.gemini/antigravity-ide/brain/3f08aaaa-8e7c-4958-86b3-eaa68c65f2b0/hero_3d_mockup_verify.png');

spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1440,900',
  '--virtual-time-budget=8000',
  `--screenshot=${outHero}`,
  'http://localhost:5173/index.html'
], { timeout: 25000 });

console.log('Hero captured:', fs.existsSync(outHero) ? fs.statSync(outHero).size : 0, 'bytes');
