const fs = require('fs');
const path = require('path');
const https = require('https');

const testimonials = [
  { 
    name: 'sarah',
    gender: 'female',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=sarah&backgroundColor=b6e3f4'
  },
  { 
    name: 'thomas',
    gender: 'male',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=thomas&backgroundColor=b6e3f4'
  },
  { 
    name: 'lisa',
    gender: 'female',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=lisa&backgroundColor=b6e3f4'
  },
  { 
    name: 'michael',
    gender: 'male',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=michael&backgroundColor=b6e3f4'
  },
  { 
    name: 'julia',
    gender: 'female',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=julia&backgroundColor=b6e3f4'
  },
  { 
    name: 'david',
    gender: 'male',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=david&backgroundColor=b6e3f4'
  },
  { 
    name: 'anna',
    gender: 'female',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=anna&backgroundColor=b6e3f4'
  },
  { 
    name: 'james',
    gender: 'male',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=james&backgroundColor=b6e3f4'
  },
  { 
    name: 'elena',
    gender: 'female',
    imageUrl: 'https://api.dicebear.com/7.x/personas/jpg?seed=elena&backgroundColor=b6e3f4'
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function generateProfilePictures() {
  const outputDir = path.join(process.cwd(), 'public/images/testimonials');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const testimonial of testimonials) {
    const outputPath = path.join(outputDir, `${testimonial.name}.jpg`);
    
    try {
      await downloadImage(testimonial.imageUrl, outputPath);
      console.log(`Downloaded profile picture for ${testimonial.name}`);
    } catch (error) {
      console.error(`Error downloading profile picture for ${testimonial.name}:`, error);
    }
  }
}

generateProfilePictures().catch(console.error); 