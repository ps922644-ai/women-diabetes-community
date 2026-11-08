const fs = require('fs');

const html = fs.readFileSync('site_raw.html', 'utf8');

// Let's inspect Section 2 (mission), Section 3 (programs), Section 4 (benefits), Section 5 (stories), Section 6 (gallery), Section 7 (faq)
console.log('--- SECTION 2 (mission) ---');
console.log(fs.readFileSync('section_2.html', 'utf8'));

console.log('--- SECTION 3 (programs) ---');
console.log(fs.readFileSync('section_3.html', 'utf8'));

console.log('--- SECTION 4 (benefits) ---');
console.log(fs.readFileSync('section_4.html', 'utf8'));

console.log('--- SECTION 5 (stories) ---');
console.log(fs.readFileSync('section_5.html', 'utf8'));

console.log('--- SECTION 6 (gallery) ---');
console.log(fs.readFileSync('section_6.html', 'utf8'));

console.log('--- SECTION 7 (faq) ---');
console.log(fs.readFileSync('section_7.html', 'utf8'));
