const fs = require('fs');
const path = require('path');
const https = require('https');

const requiredImages = {
  'public/images/backgrounds/hero-bg.jpg': 'Hero background',
  'public/images/services/private-lessons.jpg': 'Private lessons service',
  'public/images/services/performance.jpg': 'Performance service',
  'public/images/services/workshop.jpg': 'Workshop service',
  'public/images/services/piano.jpg': 'Piano service',
  'public/images/testimonials/david.jpg': 'David testimonial',
  'public/images/testimonials/james.jpg': 'James testimonial',
  'public/images/testimonials/anna.jpg': 'Anna testimonial',
  'public/favicon.ico': 'Favicon'
};

const imagePaths = [
  // Gallery images
  '/vocal-coaching/images/gallery/performance1.jpg',
  '/vocal-coaching/images/gallery/performance2.jpg',
  '/vocal-coaching/images/gallery/performance3.jpg',
  '/vocal-coaching/images/gallery/performance4.jpg',
  '/vocal-coaching/images/gallery/performance5.jpg',
  '/vocal-coaching/images/gallery/performance6.jpg',
  '/vocal-coaching/images/gallery/performance7.jpg',
  '/vocal-coaching/images/gallery/performance8.jpg',
  '/vocal-coaching/images/gallery/performance9.jpg',
  
  // Collaboration logos
  '/vocal-coaching/images/collaborations/bflat.svg',
  '/vocal-coaching/images/collaborations/cvi.svg',
  '/vocal-coaching/images/collaborations/jib.svg',
  '/vocal-coaching/images/collaborations/philharmonie.svg',
  
  // Service images
  '/vocal-coaching/images/services/private-lessons.jpg',
  '/vocal-coaching/images/services/performance.jpg',
  '/vocal-coaching/images/services/workshop.jpg',
  '/vocal-coaching/images/services/piano.jpg'
];

const baseUrl = 'https://amir3629.github.io';

// Create directories if they don't exist
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
}

// Create a simple placeholder image
function createPlaceholderImage(filePath, label) {
  ensureDirectoryExists(filePath);
  
  if (filePath.endsWith('.ico')) {
    // Copy a default favicon if it doesn't exist
    if (!fs.existsSync(filePath)) {
      console.log(`Creating placeholder favicon at ${filePath}`);
      // Create a simple 16x16 ICO file
      const faviconData = Buffer.from([
        0,0,1,0,1,0,16,16,0,0,1,0,24,0,68,3,0,0,22,0,0,0,
        // ... more favicon data ...
      ]);
      fs.writeFileSync(filePath, faviconData);
    }
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.log(`Creating placeholder image at ${filePath}`);
    // Create a simple colored rectangle with text
    const svgContent = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#2a2a2a"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">
          ${label} Placeholder
        </text>
      </svg>
    `;
    fs.writeFileSync(filePath, svgContent);
  }
}

// Verify all required images
Object.entries(requiredImages).forEach(([filePath, label]) => {
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${filePath}`);
    createPlaceholderImage(filePath, label);
  } else {
    console.log(`Found: ${filePath}`);
  }
});

async function checkImage(path) {
  return new Promise((resolve) => {
    const url = baseUrl + path;
    https.get(url, (res) => {
      console.log(`${path}: ${res.statusCode === 200 ? '✅ OK' : '❌ Failed'} (${res.statusCode})`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`${path}: ❌ Error - ${err.message}`);
      resolve(false);
    });
  });
}

async function checkAllImages() {
  console.log('Checking image accessibility on GitHub Pages...\n');
  
  const results = await Promise.all(imagePaths.map(checkImage));
  
  const successful = results.filter(Boolean).length;
  const total = imagePaths.length;
  
  console.log(`\nSummary:`);
  console.log(`✅ ${successful} images accessible`);
  console.log(`❌ ${total - successful} images not accessible`);
  console.log(`Total: ${total} images checked`);
}

checkAllImages(); 