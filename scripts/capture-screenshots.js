#!/usr/bin/env node

/**
 * Automated Ruffle Screenshot Capture
 * Phase 3.2.3 - Veit Helmer Archive
 * 
 * This script uses Playwright to automatically capture screenshots of legacy SWF websites
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const MOVIES = [
  {
    slug: 'absurdistan',
    name: 'Absurdistan',
    files: [
      { url: 'absurdistan/index.html', type: 'html' },
      { url: 'absurdistan/ruffle-viewer.html', type: 'swf' }
    ]
  },
  {
    slug: 'torzumhimmel',
    name: 'Torzumhimmel',
    files: [
      { url: 'torzumhimmel/ruffle-viewer.html', type: 'swf', lang: 'de' },
      { url: 'torzumhimmel/ruffle-viewer-en.html', type: 'swf', lang: 'en' }
    ]
  },
  {
    slug: 'tuvalu',
    name: 'Tuvalu',
    files: [
      { url: 'tuvalu/index.html', type: 'html' },
      { url: 'tuvalu/de/ruffle-viewer.html', type: 'swf', lang: 'de' },
      { url: 'tuvalu/en/ruffle-viewer.html', type: 'swf', lang: 'en' }
    ]
  },
  {
    slug: 'quatsch',
    name: 'Quatsch',
    files: [
      { url: 'quatsch/index.html', type: 'html' }
    ]
  },
  {
    slug: 'vom-lokfuehrer-der-die-liebe-suchte',
    name: 'Vom Lokführer der die Liebe suchte',
    files: [
      { url: 'vom-lokfuehrer-der-die-liebe-suchte/index.html', type: 'html' }
    ]
  },
  {
    slug: 'baikonur',
    name: 'Baikonur',
    files: [
      { url: 'baikonur/de/template/global/jwplayer/player-licensed.swf', type: 'swf' }
    ]
  }
];

const BASE_URL = 'http://localhost:8080';
const WAIT_FOR_LOAD = 5000;
const WAIT_FOR_ANIMATION = 3000;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ensureDirectory(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function captureScreenshot(page, outputPath, description) {
  try {
    await page.screenshot({ 
      path: outputPath, 
      fullPage: true,
      timeout: 10000 
    });
    console.log(`  ✓ Captured: ${description}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed: ${description} - ${error.message}`);
    return false;
  }
}

async function captureMovie(browser, movie) {
  console.log(`\n📽️  Processing: ${movie.name}`);
  console.log('─'.repeat(60));
  
  const ruffleDir = path.join('legacy/movie-websites', movie.slug, 'ruffle');
  await ensureDirectory(ruffleDir);
  
  let totalScreenshots = 0;
  
  for (const file of movie.files) {
    const langSuffix = file.lang ? `_${file.lang}` : '';
    const fileType = file.type === 'swf' ? 'swf' : 'html';
    
    console.log(`\n  Loading: ${file.url}`);
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();
    
    try {
      // Navigate to the page
      const url = `${BASE_URL}/${file.url}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for initial load
      await sleep(WAIT_FOR_LOAD);
      
      // Capture 1: Initial load
      const screenshotPath1 = path.join(ruffleDir, `${movie.slug}${langSuffix}_landing_initial_01.png`);
      if (await captureScreenshot(page, screenshotPath1, 'Initial load')) {
        totalScreenshots++;
      }
      
      // Wait for Ruffle to initialize (if SWF)
      if (file.type === 'swf') {
        console.log('  ⏳ Waiting for Ruffle initialization...');
        await page.waitForSelector('ruffle-player, embed, object', { timeout: 10000 }).catch(() => {});
        await sleep(WAIT_FOR_ANIMATION);
      }
      
      // Capture 2: After load/animation
      const screenshotPath2 = path.join(ruffleDir, `${movie.slug}${langSuffix}_loaded_state_01.png`);
      if (await captureScreenshot(page, screenshotPath2, 'Loaded state')) {
        totalScreenshots++;
      }
      
      // Try to detect and click common UI elements
      const clickableSelectors = [
        'a', 'button', '.button', '.btn', 
        '[onclick]', '[role="button"]',
        'area[href]' // Image maps
      ];
      
      let clickedElements = 0;
      for (const selector of clickableSelectors) {
        try {
          const elements = await page.$$(selector);
          if (elements.length > 0 && clickedElements < 5) {
            console.log(`  🔍 Found ${elements.length} ${selector} elements`);
            
            // Click first few elements
            for (let i = 0; i < Math.min(elements.length, 3); i++) {
              try {
                const element = elements[i];
                const text = await element.textContent().catch(() => 'unknown');
                const tagName = await element.evaluate(el => el.tagName).catch(() => 'unknown');
                
                // Get element position for hover
                const box = await element.boundingBox();
                if (box) {
                  // Hover
                  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                  await sleep(500);
                  
                  const hoverPath = path.join(ruffleDir, `${movie.slug}${langSuffix}_hover_element_${clickedElements + 1}_01.png`);
                  if (await captureScreenshot(page, hoverPath, `Hover on ${tagName}`)) {
                    totalScreenshots++;
                  }
                  
                  // Click
                  await element.click({ timeout: 2000 }).catch(() => {});
                  await sleep(WAIT_FOR_ANIMATION);
                  
                  const clickPath = path.join(ruffleDir, `${movie.slug}${langSuffix}_click_element_${clickedElements + 1}_01.png`);
                  if (await captureScreenshot(page, clickPath, `After click ${tagName}`)) {
                    totalScreenshots++;
                  }
                  
                  clickedElements++;
                  
                  // Go back if possible
                  if (page.url() !== url) {
                    await page.goBack({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {});
                    await sleep(1000);
                  }
                }
              } catch (error) {
                // Element might be stale or not clickable
                continue;
              }
            }
          }
        } catch (error) {
          // Selector might not exist
          continue;
        }
      }
      
      // Try to capture at different scroll positions
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      
      if (pageHeight > viewportHeight) {
        console.log('  📜 Capturing scrolled view...');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await sleep(500);
        
        const scrollPath = path.join(ruffleDir, `${movie.slug}${langSuffix}_scrolled_mid_01.png`);
        if (await captureScreenshot(page, scrollPath, 'Scrolled (mid)')) {
          totalScreenshots++;
        }
      }
      
      // Capture any canvas elements (Flash renders to canvas)
      try {
        const canvases = await page.$$('canvas');
        if (canvases.length > 0) {
          console.log(`  🎨 Found ${canvases.length} canvas elements`);
          for (let i = 0; i < Math.min(canvases.length, 3); i++) {
            await sleep(1000);
            const canvasPath = path.join(ruffleDir, `${movie.slug}${langSuffix}_canvas_${i + 1}_01.png`);
            if (await captureScreenshot(page, canvasPath, `Canvas ${i + 1}`)) {
              totalScreenshots++;
            }
          }
        }
      } catch (error) {
        // Canvas capture failed
      }
      
    } catch (error) {
      console.error(`  ✗ Error processing ${file.url}: ${error.message}`);
    } finally {
      await context.close();
    }
  }
  
  console.log(`\n  📊 Total screenshots for ${movie.name}: ${totalScreenshots}`);
  return totalScreenshots;
}

async function updateCaptureLog(movie, screenshotCount) {
  const logPath = path.join('legacy/movie-websites', movie.slug, 'ruffle', 'CAPTURE_LOG.md');
  
  try {
    let content = await fs.readFile(logPath, 'utf-8');
    
    // Update status
    content = content.replace('**Status:** Not Started', '**Status:** Automated Capture Complete');
    content = content.replace('**Total screenshots:**', `**Total screenshots:** ${screenshotCount}`);
    content = content.replace('**Coverage:** [Complete / Partial / Blocked]', '**Coverage:** Automated (Partial)');
    
    // Add automation note
    const automationNote = `\n## Automation Notes\n\n**Date:** ${new Date().toISOString().split('T')[0]}\n**Method:** Automated capture via Playwright\n**Coverage:** Initial states, some interactions\n**Manual review recommended:** Yes\n\n`;
    
    if (!content.includes('## Automation Notes')) {
      content = content.replace('## Session Summary', automationNote + '## Session Summary');
    }
    
    await fs.writeFile(logPath, content, 'utf-8');
    console.log(`  ✓ Updated CAPTURE_LOG.md`);
  } catch (error) {
    console.error(`  ✗ Failed to update capture log: ${error.message}`);
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  🎬 Phase 3.2.3: Automated Ruffle Screenshot Capture          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  console.log('🚀 Starting automated capture...\n');
  console.log('Prerequisites:');
  console.log('  ✓ Playwright installed');
  console.log('  ✓ Chromium browser ready');
  console.log('  ⚠️  Local server must be running on http://localhost:8080\n');
  
  // Test server availability
  try {
    const testContext = await chromium.launch({ headless: true });
    const testBrowser = await testContext.newContext();
    const testPage = await testBrowser.newPage();
    await testPage.goto(BASE_URL, { timeout: 5000 });
    await testBrowser.close();
    await testContext.close();
    console.log('  ✓ Server is running\n');
  } catch (error) {
    console.error('  ✗ Server not accessible. Please start the server first:');
    console.error('    ./scripts/start-ruffle-capture.sh\n');
    process.exit(1);
  }
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let totalScreenshots = 0;
  
  for (const movie of MOVIES) {
    const count = await captureMovie(browser, movie);
    totalScreenshots += count;
    await updateCaptureLog(movie, count);
    await sleep(1000); // Brief pause between movies
  }
  
  await browser.close();
  
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  ✅ Automated Capture Complete                                 ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  console.log(`📊 Summary:`);
  console.log(`   Movies processed: ${MOVIES.length}`);
  console.log(`   Total screenshots: ${totalScreenshots}`);
  console.log(`\n📁 Screenshots saved to: legacy/movie-websites/[slug]/ruffle/`);
  console.log(`\n⚠️  Note: Automated capture provides initial coverage.`);
  console.log(`   Manual review and additional captures may be needed for:`);
  console.log(`   - Complex Flash interactions`);
  console.log(`   - Deep navigation paths`);
  console.log(`   - Animation sequences`);
  console.log(`   - Hover states in Flash content\n`);
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
