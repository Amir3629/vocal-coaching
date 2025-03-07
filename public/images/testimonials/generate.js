const fs = require('fs');
const path = require('path');
const https = require('https');

const testimonials = [
  { 
    name: 'sarah',
    gender: 'female',
    imageUrl: 'https://fakeface.rest/face/view/1?gender=female&minimum_age=25&maximum_age=35'
  },
  { 
    name: 'thomas',
    gender: 'male',
    imageUrl: 'https://fakeface.rest/face/view/2?gender=male&minimum_age=30&maximum_age=40'
  },
  { 
    name: 'lisa',
    gender: 'female',
    imageUrl: 'https://fakeface.rest/face/view/3?gender=female&minimum_age=25&maximum_age=35'
  },
  { 
    name: 'michael',
    gender: 'male',
    imageUrl: 'https://fakeface.rest/face/view/4?gender=male&minimum_age=35&maximum_age=45'
  },
  { 
    name: 'julia',
    gender: 'female',
    imageUrl: 'https://fakeface.rest/face/view/5?gender=female&minimum_age=20&maximum_age=30'
  },
  { 
    name: 'david',
    gender: 'male',
    imageUrl: 'https://fakeface.rest/face/view/6?gender=male&minimum_age=25&maximum_age=35'
  },
  { 
    name: 'anna',
    gender: 'female',
    imageUrl: 'https://fakeface.rest/face/view/7?gender=female&minimum_age=28&maximum_age=38'
  },
  { 
    name: 'james',
    gender: 'male',
    imageUrl: 'https://fakeface.rest/face/view/8?gender=male&minimum_age=30&maximum_age=40'
  },
  { 
    name: 'elena',
    gender: 'female',
    imageUrl: 'https://fakeface.rest/face/view/9?gender=female&minimum_age=25&maximum_age=35'
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