const fs = require('fs');
const path = require('path');

const testimonials = [
  { name: 'david', color: '#3B82F6' },
  { name: 'james', color: '#10B981' },
  { name: 'anna', color: '#EC4899' },
  { name: 'sarah', color: '#8B5CF6' }
];

function generateProfilePicture(name, color) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="${color}"/>
  <circle cx="100" cy="80" r="40" fill="white" fill-opacity="0.9"/>
  <path d="M100 180C66.8629 180 40 153.137 40 120C40 106.745 44.1459 94.4883 51.4721 84.4721C63.4883 96.4883 80.7452 104 100 104C119.255 104 136.512 96.4883 148.528 84.4721C155.854 94.4883 160 106.745 160 120C160 153.137 133.137 180 100 180Z" fill="white" fill-opacity="0.9"/>
</svg>`;

  const outputDir = path.join(process.cwd(), 'public', 'images', 'testimonials');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${name}.svg`);
  fs.writeFileSync(outputPath, svg);
  console.log(`Generated profile picture for ${name} at ${outputPath}`);
}

testimonials.forEach(({ name, color }) => {
  generateProfilePicture(name, color);
}); 