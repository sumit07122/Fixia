const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('scratch/work_page_verify.png');

spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--window-size=1440,2800',
  '--virtual-time-budget=5000',
  '--screenshot=' + outPath,
  'http://localhost:5173/work.html'
]);

console.log('Result file size:', fs.existsSync(outPath) ? fs.statSync(outPath).size : 'not found');
