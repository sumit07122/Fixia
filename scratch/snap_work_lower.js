const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('scratch/work_page_lower.png');

// Scroll down on work page and snap
spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--window-size=1440,5500',
  '--virtual-time-budget=6000',
  '--screenshot=' + outPath,
  'http://localhost:5173/work.html'
]);

console.log('Result lower file size:', fs.existsSync(outPath) ? fs.statSync(outPath).size : 'not found');
