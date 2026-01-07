#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FILMS_DIR = path.join(__dirname, '../content/films');
const LOG_FILE = path.join(__dirname, '../migration_log.md');

const log = {
  entries: [],
  add(message) {
    const timestamp = new Date().toISOString();
    this.entries.push(`[${timestamp}] ${message}`);
    console.log(message);
  },
  save() {
    const content = `\n## Phase 5.1.7: Final Video Standardization & Integration\n\n${this.entries.join('\n')}\n`;
    fs.appendFileSync(LOG_FILE, content, 'utf8');
    console.log(`\n✅ Log saved to ${LOG_FILE}`);
  }
};

function findAllMP4s() {
  const films = fs.readdirSync(FILMS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  const mp4Files = [];
  films.forEach(slug => {
    const filmDir = path.join(FILMS_DIR, slug);
    const trailerPath = path.join(filmDir, 'trailer.mp4');
    
    if (fs.existsSync(trailerPath)) {
      mp4Files.push({ slug, path: trailerPath });
    }
  });
  
  return mp4Files;
}

function generatePosterFrame(videoPath, outputPath) {
  try {
    // Extract frame at 1 second mark
    execSync(
      `ffmpeg -i "${videoPath}" -ss 00:00:01.000 -vframes 1 -q:v 2 "${outputPath}" -y`,
      { stdio: 'pipe' }
    );
    return true;
  } catch (error) {
    console.error(`Failed to generate poster for ${videoPath}: ${error.message}`);
    return false;
  }
}

function updateFrontmatter(filmSlug) {
  const filmDir = path.join(FILMS_DIR, filmSlug);
  const markdownFiles = fs.readdirSync(filmDir)
    .filter(f => f.startsWith('index_') && f.endsWith('.md'));
  
  let updated = 0;
  markdownFiles.forEach(mdFile => {
    const mdPath = path.join(filmDir, mdFile);
    let content = fs.readFileSync(mdPath, 'utf8');
    
    // Check if trailer_video exists in frontmatter
    if (content.includes('trailer_video:')) {
      // Already has trailer_video, check if it's correct
      if (!content.match(/trailer_video:\s*trailer\.mp4/)) {
        content = content.replace(
          /trailer_video:\s*[^\n]+/,
          'trailer_video: trailer.mp4'
        );
        fs.writeFileSync(mdPath, content, 'utf8');
        updated++;
        log.add(`  ✓ Updated trailer_video in ${filmSlug}/${mdFile}`);
      }
    } else {
      // Add trailer_video after poster_image if it exists
      if (content.includes('poster_image:')) {
        content = content.replace(
          /(poster_image:[^\n]+\n)/,
          '$1trailer_video: trailer.mp4\n'
        );
        fs.writeFileSync(mdPath, content, 'utf8');
        updated++;
        log.add(`  ✓ Added trailer_video to ${filmSlug}/${mdFile}`);
      }
    }
    
    // Add trailer_poster if not exists and poster was generated
    const posterPath = path.join(filmDir, 'trailer.jpg');
    if (fs.existsSync(posterPath) && !content.includes('trailer_poster:')) {
      if (content.includes('trailer_video:')) {
        content = content.replace(
          /(trailer_video:[^\n]+\n)/,
          '$1trailer_poster: trailer.jpg\n'
        );
        fs.writeFileSync(mdPath, content, 'utf8');
        updated++;
        log.add(`  ✓ Added trailer_poster to ${filmSlug}/${mdFile}`);
      }
    }
  });
  
  return updated;
}

function main() {
  log.add('=== Phase 5.1.7: Final Video Standardization & Integration ===');
  log.add(`Started at: ${new Date().toISOString()}`);
  log.add('');
  
  // Step 1: Find all MP4s
  log.add('Step 1: Collecting all valid MP4 files...');
  const mp4Files = findAllMP4s();
  log.add(`Found ${mp4Files.length} trailer.mp4 files`);
  log.add('');
  
  // Step 2-3: Generate poster frames
  log.add('Step 2: Generating poster frames from videos...');
  let generatedPosters = 0;
  let skippedPosters = 0;
  
  mp4Files.forEach(({ slug, path: videoPath }) => {
    const posterPath = videoPath.replace('.mp4', '.jpg');
    
    if (fs.existsSync(posterPath)) {
      log.add(`  ⊘ Skipped ${slug}/trailer.jpg (already exists)`);
      skippedPosters++;
    } else {
      log.add(`  → Generating poster for ${slug}...`);
      if (generatePosterFrame(videoPath, posterPath)) {
        generatedPosters++;
        log.add(`  ✓ Generated ${slug}/trailer.jpg`);
      } else {
        log.add(`  ✗ Failed to generate ${slug}/trailer.jpg`);
      }
    }
  });
  
  log.add('');
  log.add(`Poster generation complete: ${generatedPosters} generated, ${skippedPosters} skipped`);
  log.add('');
  
  // Step 4: Update frontmatter
  log.add('Step 3: Updating frontmatter in markdown files...');
  let totalUpdates = 0;
  
  mp4Files.forEach(({ slug }) => {
    const updates = updateFrontmatter(slug);
    totalUpdates += updates;
  });
  
  log.add('');
  log.add(`Frontmatter updates complete: ${totalUpdates} files updated`);
  log.add('');
  
  // Summary
  log.add('=== Summary ===');
  log.add(`Total films processed: ${mp4Files.length}`);
  log.add(`Poster frames generated: ${generatedPosters}`);
  log.add(`Poster frames skipped: ${skippedPosters}`);
  log.add(`Frontmatter files updated: ${totalUpdates}`);
  log.add('');
  log.add('✅ Phase 5.1.7 Complete!');
  log.add('');
  log.add('File structure achieved:');
  log.add('  content/films/[slug]/trailer.mp4');
  log.add('  content/films/[slug]/trailer.jpg (poster frame)');
  log.add('  content/films/[slug]/index_*.md (with trailer_video: trailer.mp4)');
  
  // Save log
  log.save();
}

main();
