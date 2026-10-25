const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outHero = path.resolve('c:/Users/hp/.gemini/antigravity-ide/brain/3f08aaaa-8e7c-4958-86b3-eaa68c65f2b0/hero_3d_mockup_verify.png');

console.log('Capturing hero 3d mockup with virtual time budget...');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --window-size=1440,900 --screenshot="${outHero}" "http://localhost:5173/index.html?t=${Date.now()}"`);

console.log('Done capturing!');
