const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = path.resolve('scratch/final_home_verify.png');

spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--window-size=1440,3200',
  '--virtual-time-budget=5000',
  '--screenshot=' + outPath,
  'http://localhost:5173/index.html'
]);

console.log('Homepage verification captured:', fs.existsSync(outPath) ? fs.statSync(outPath).size : 'not found');
