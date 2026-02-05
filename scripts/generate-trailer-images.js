const sharp = require('sharp');
const path = require('path');

const sizes = [900, 1200, 1500, 1800];
const basePath = path.join(__dirname, '../content/films/the-bra/trailer.jpg');

async function generateImages() {
  console.log('🎬 Generating trailer poster images...');
  
  for (const width of sizes) {
    const outputPath = path.join(__dirname, `../content/films/the-bra/trailer-${width}w.webp`);
    try {
      await sharp(basePath)
        .resize(width)
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`✅ Generated trailer-${width}w.webp`);
    } catch (error) {
      console.error(`❌ Failed to generate trailer-${width}w.webp:`, error.message);
    }
  }
  
  console.log('🎉 Done!');
}

generateImages();
