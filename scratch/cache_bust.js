const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/hp/OneDrive/Desktop/Fixia/fixia-website/fixia-site';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  let updated = content
    .replace(/src=["']app\.js(?:\?[^"']*)?["']/g, 'src="app.js?v=20261025d"')
    .replace(/src=["']polish\.js(?:\?[^"']*)?["']/g, 'src="polish.js?v=20261025d"')
    .replace(/href=["']styles\.css(?:\?[^"']*)?["']/g, 'href="styles.css?v=20261025d"')
    .replace(/href=["']polish\.css(?:\?[^"']*)?["']/g, 'href="polish.css?v=20261025d"');
  if (content !== updated) {
    fs.writeFileSync(p, updated, 'utf8');
  }
});
console.log('Cache bust updated to 20261025d in all HTML files');
