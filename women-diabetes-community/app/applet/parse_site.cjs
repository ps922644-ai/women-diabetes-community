const fs = require('fs');
const html = fs.readFileSync('site_raw.html', 'utf8');

// Find sections and their content
const sectionRegex = /<section[\s\S]*?<\/section>/gi;
const matchedSections = html.match(sectionRegex) || [];

console.log(`Found ${matchedSections.length} sections`);

matchedSections.forEach((sec, idx) => {
  const idMatch = sec.match(/id="([^"]+)"/);
  const id = idMatch ? idMatch[1] : `section-${idx}`;
  const h1 = sec.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2 = sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  console.log(`\n=== Section ${idx + 1}: ${id} ===`);
  if (h1) console.log(`H1: ${h1[1].replace(/<[^>]+>/g, '').trim()}`);
  if (h2) console.log(`H2: ${h2[1].replace(/<[^>]+>/g, '').trim()}`);
});

fs.writeFileSync('extracted_sections.json', JSON.stringify(matchedSections, null, 2));
