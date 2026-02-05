#!/usr/bin/env node

/**
 * Generate Responsive Image Sizes
 * 
 * Scans all film directories for poster and cinema-poster images,
 * and generates missing WebP sizes for responsive loading.
 * 
 * Required sizes:
 * - poster: 300w, 600w, 900w, 1200w, 1500w, 1800w
 * - cinema-poster: 300w, 600w, 900w, 1200w, 1500w
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

const FILMS_DIR = path.join(__dirname, '..', 'content', 'films');

// Define required sizes for each image type
const IMAGE_CONFIGS = {
  'poster': [300, 600, 900, 1200, 1500, 1800],
  'cinema-poster': [300, 600, 900, 1200, 1500],
  'cinema-poster-de': [300, 600, 900, 1200, 1500],
  'cinema-poster-en': [300, 600, 900, 1200, 1500]
};

/**
 * Generate responsive WebP image at specified width
 */
async function generateResponsiveImage(sourcePath, outputPath, width) {
  try {
    await sharp(sourcePath)
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log(`  ✓ Generated ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed to generate ${path.basename(outputPath)}: ${error.message}`);
    return false;
  }
}

/**
 * Process a single image file (poster or cinema-poster)
 */
async function processImage(sourceFile, baseNameWithoutExt) {
  const filmDir = path.dirname(sourceFile);
  const config = IMAGE_CONFIGS[baseNameWithoutExt];
  
  if (!config) {
    return;
  }
  
  console.log(`\n  Processing ${baseNameWithoutExt}...`);
  
  let generated = 0;
  let skipped = 0;
  
  for (const width of config) {
    const outputFile = path.join(filmDir, `${baseNameWithoutExt}-${width}w.webp`);
    
    if (fs.existsSync(outputFile)) {
      skipped++;
      continue;
    }
    
    const success = await generateResponsiveImage(sourceFile, outputFile, width);
    if (success) {
      generated++;
    }
  }
  
  if (generated > 0) {
    console.log(`  Generated ${generated} new sizes`);
  }
  if (skipped > 0) {
    console.log(`  Skipped ${skipped} existing sizes`);
  }
}

/**
 * Process all images in a film directory
 */
async function processFilmDirectory(filmDir) {
  const filmName = path.basename(filmDir);
  console.log(`\n📁 ${filmName}`);
  
  // Find all source images (jpg or webp files)
  const imageBases = [
    'poster',
    'cinema-poster',
    'cinema-poster-de',
    'cinema-poster-en'
  ];
  
  const sourceImages = [];
  for (const base of imageBases) {
    // Check for .jpg first, then .webp
    const jpgPath = path.join(filmDir, `${base}.jpg`);
    const webpPath = path.join(filmDir, `${base}.webp`);
    
    if (fs.existsSync(jpgPath)) {
      sourceImages.push({ path: jpgPath, base });
    } else if (fs.existsSync(webpPath)) {
      sourceImages.push({ path: webpPath, base });
    }
  }
  
  if (sourceImages.length === 0) {
    console.log('  No source images found');
    return;
  }
  
  for (const { path: imgPath, base } of sourceImages) {
    await processImage(imgPath, base);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Generating Responsive Images for Film Posters\n');
  console.log('Source directory:', FILMS_DIR);
  
  if (!fs.existsSync(FILMS_DIR)) {
    console.error('❌ Films directory not found!');
    process.exit(1);
  }
  
  // Get all film directories
  const filmDirs = fs.readdirSync(FILMS_DIR)
    .map(name => path.join(FILMS_DIR, name))
    .filter(dir => fs.statSync(dir).isDirectory());
  
  console.log(`Found ${filmDirs.length} film directories\n`);
  console.log('=' .repeat(60));
  
  let totalProcessed = 0;
  
  for (const filmDir of filmDirs) {
    try {
      await processFilmDirectory(filmDir);
      totalProcessed++;
    } catch (error) {
      console.error(`\n❌ Error processing ${path.basename(filmDir)}:`, error.message);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log(`\n✅ Complete! Processed ${totalProcessed} film directories`);
  console.log('\nNote: Images are only generated if the source .jpg or .webp file exists');
  console.log('and the target size hasn\'t been created yet.\n');
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
