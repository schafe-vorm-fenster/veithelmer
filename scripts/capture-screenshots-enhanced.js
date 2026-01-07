#!/usr/bin/env node

/**
 * Enhanced Ruffle Screenshot Capture - Phase 2
 * Captures more detailed interactions with SWF content
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const ENHANCED_CAPTURES = [
  {
    slug: 'absurdistan',
    name: 'Absurdistan',
    url: 'absurdistan/ruffle-viewer.html',
    waitForRuffle: 8000,
    interactions: [
      { type: 'wait', duration: 5000, description: 'Initial animation' },
      { type: 'click', x: 640, y: 400, description: 'Center click' },
      { type: 'wait', duration: 3000 },
      { type: 'click', x: 100, y: 100, description: 'Top-left' },
      { type: 'wait', duration: 2000 },
      { type: 'click', x: 1100, y: 100, description: 'Top-right' },
      { type: 'wait', duration: 2000 },
      { type: 'click', x: 640, y: 700, description: 'Bottom center' },
      { type: 'wait', duration: 2000 }
    ]
  },
  {
    slug: 'torzumhimmel',
    name: 'Torzumhimmel (DE)',
    url: 'torzumhimmel/ruffle-viewer.html',
    lang: 'de',
    waitForRuffle: 8000,
    interactions: [
      { type: 'wait', duration: 5000, description: 'Initial animation' },
      { type: 'click', x: 640, y: 400, description: 'Center' },
      { type: 'wait', duration: 3000 },
      { type: 'click', x: 200, y: 200, description: 'Menu area' },
      { type: 'wait', duration: 2000 },
      { type: 'click', x: 640, y: 600, description: 'Lower area' },
      { type: 'wait', duration: 2000 }
    ]
  },
  {
    slug: 'torzumhimmel',
    name: 'Torzumhimmel (EN)',
    url: 'torzumhimmel/ruffle-viewer-en.html',
    lang: 'en',
    waitForRuffle: 8000,
    interactions: [
      { type: 'wait', duration: 5000, description: 'Initial animation' },
      { type: 'click', x: 640, y: 400, description: 'Center' },
      { type: 'wait', duration: 3000 },
      { type: 'click', x: 200, y: 200, description: 'Menu area' },
      { type: 'wait', duration: 2000 }
    ]
  },
  {
    slug: 'tuvalu',
    name: 'Tuvalu Intro (DE)',
    url: 'tuvalu/de/ruffle-viewer.html',
    lang: 'de',
    waitForRuffle: 8000,
    interactions: [
      { type: 'wait', duration: 3000, description: 'Intro animation' },
      { type: 'wait', duration: 3000, description: 'Continued' },
      { type: 'click', x: 640, y: 400, description: 'Center' },
      { type: 'wait', duration: 2000 }
    ]
  },
  {
    slug: 'tuvalu',
    name: 'Tuvalu Intro (EN)',
    url: 'tuvalu/en/ruffle-viewer.html',
    lang: 'en',
    waitForRuffle: 8000,
    interactions: [
      { type: 'wait', duration: 3000, description: 'Intro animation' },
      { type: 'wait', duration: 3000, description: 'Continued' },
      { type: 'click', x: 640, y: 400, description: 'Center' },
      { type: 'wait', duration: 2000 }
    ]
  }
];

const BASE_URL = 'http://localhost:8080';

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

async function captureEnhanced(browser, config) {
  console.log(`\n📽️  ${config.name}`);
  console.log('─'.repeat(60));
  
  const langSuffix = config.lang ? `_${config.lang}` : '';
  const ruffleDir = path.join('legacy/movie-websites', config.slug, 'ruffle');
  await ensureDirectory(ruffleDir);
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  
  let screenshotCount = 0;
  
  try {
    const url = `${BASE_URL}/${config.url}`;
    console.log(`  Loading: ${config.url}`);
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(2000);
    
    // Wait for Ruffle
    console.log('  ⏳ Waiting for Ruffle...');
    await page.waitForSelector('ruffle-player', { timeout: 10000 }).catch(() => {});
    await sleep(config.waitForRuffle);
    
    // Capture initial state after Ruffle load
    const initialPath = path.join(ruffleDir, `${config.slug}${langSuffix}_ruffle_loaded_01.png`);
    await page.screenshot({ path: initialPath, fullPage: false });
    console.log(`  ✓ Ruffle loaded state`);
    screenshotCount++;
    
    // Execute interactions
    let interactionNum = 1;
    for (const interaction of config.interactions) {
      if (interaction.type === 'wait') {
        console.log(`  ⏱️  Waiting ${interaction.duration}ms - ${interaction.description}`);
        await sleep(interaction.duration);
        
        // Capture after wait (animation frame)
        const animPath = path.join(ruffleDir, `${config.slug}${langSuffix}_animation_frame_${interactionNum}_01.png`);
        await page.screenshot({ path: animPath, fullPage: false });
        console.log(`  ✓ Animation frame ${interactionNum}`);
        screenshotCount++;
        interactionNum++;
        
      } else if (interaction.type === 'click') {
        console.log(`  🖱️  Clicking at (${interaction.x}, ${interaction.y}) - ${interaction.description}`);
        await page.mouse.click(interaction.x, interaction.y);
        await sleep(1500);
        
        const clickPath = path.join(ruffleDir, `${config.slug}${langSuffix}_interaction_${interactionNum}_01.png`);
        await page.screenshot({ path: clickPath, fullPage: false });
        console.log(`  ✓ After interaction ${interactionNum}`);
        screenshotCount++;
        interactionNum++;
      }
    }
    
    console.log(`  📊 Captured ${screenshotCount} screenshots`);
    
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
  } finally {
    await context.close();
  }
  
  return screenshotCount;
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  🎬 Enhanced SWF Interaction Capture (Phase 2)                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  // Test server
  try {
    const testBrowser = await chromium.launch({ headless: true });
    const testContext = await testBrowser.newContext();
    const testPage = await testContext.newPage();
    await testPage.goto(BASE_URL, { timeout: 5000 });
    await testContext.close();
    await testBrowser.close();
    console.log('✓ Server is running\n');
  } catch (error) {
    console.error('✗ Server not accessible\n');
    process.exit(1);
  }
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let totalScreenshots = 0;
  
  for (const config of ENHANCED_CAPTURES) {
    const count = await captureEnhanced(browser, config);
    totalScreenshots += count;
    await sleep(1000);
  }
  
  await browser.close();
  
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  ✅ Enhanced Capture Complete                                  ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  console.log(`📊 Total enhanced screenshots: ${totalScreenshots}\n`);
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
