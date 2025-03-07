const fs = require('fs');
const path = require('path');

const testimonials = [
  { name: 'sarah', color: '#C8A97E' },
  { name: 'thomas', color: '#B69A6E' },
  { name: 'lisa', color: '#D4B58E' },
  { name: 'michael', color: '#A89060' },
  { name: 'julia', color: '#E0C09E' },
  { name: 'david', color: '#9A8252' },
  { name: 'anna', color: '#BCA270' },
  { name: 'james', color: '#C4A578' },
  { name: 'elena', color: '#D8B992' }
];

function generateProfilePicture(name, color) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color}99;stop-opacity:0.6" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <circle cx="100" cy="100" r="98" fill="url(#grad)" stroke="${color}" stroke-width="2"/>
  
  <!-- Abstract face shape -->
  <path d="M100 140c-22 0-40-25-40-55s18-55 40-55 40 25 40 55-18 55-40 55z" 
        fill="#ffffff" fill-opacity="0.9" filter="url(#shadow)"/>
  
  <!-- Decorative elements -->
  <circle cx="85" cy="95" r="4" fill="${color}"/>
  <circle cx="115" cy="95" r="4" fill="${color}"/>
  <path d="M85 115q15 10 30 0" stroke="${color}" stroke-width="2" fill="none"/>
</svg>`;

  const outputDir = path.join(process.cwd(), 'public/images/testimonials');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${name}.svg`);
  fs.writeFileSync(outputPath, svg);
  console.log(`Generated profile picture for ${name}`);
}

testimonials.forEach(({ name, color }) => {
  generateProfilePicture(name, color);
}); 