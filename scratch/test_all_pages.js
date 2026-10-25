const fs = require('fs');

async function testAll() {
  const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
  console.log(`Auditing ${files.length} HTML pages on http://localhost:5173/ ...\n`);

  let errors = 0;
  for (const f of files) {
    try {
      const res = await fetch(`http://localhost:5173/${f}`);
      if (res.status !== 200) {
        console.error(`❌ [${res.status}] ${f}`);
        errors++;
      } else {
        const text = await res.text();
        const hasFavicon = text.includes('fixia-favicon.svg');
        const hasPolishCss = text.includes('polish.css');
        const hasPolishJs = text.includes('polish.js');
        console.log(`✓ [200 OK] ${f} (${text.length} chars) - Favicon: ${hasFavicon ? 'OK' : 'MISSING'} | Polish: ${hasPolishCss && hasPolishJs ? 'OK' : 'MISSING'}`);
      }
    } catch(err) {
      console.error(`❌ ERROR connecting to ${f}:`, err.message);
      errors++;
    }
  }

  console.log(`\nAudit complete: ${errors} errors.`);
}

testAll();
