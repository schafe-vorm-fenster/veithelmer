#!/usr/bin/env node

/**
 * Capture remaining sites - Phase 3
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const SITES = [
  {
    slug: 'behindthecouch',
    name: 'Behind the Couch',
    pages: [
      { url: 'behindthecouch/de/index.html', lang: 'de' },
      { url: 'behindthecouch/en/index.html', lang: 'en' },
      { url: 'behindthecouch/de/about.html', lang: 'de', page: 'about' },
      { url: 'behindthecouch/de/casting.html', lang: 'de', page: 'casting' },
      { url: 'behindthecouch/en/about.html', lang: 'en', page: 'about' }
    ]
  },
  {
    slug: 'the-bra',
    name: 'The Bra',
    pages: [
      { url: 'the-bra/html/index.html' }
    ]
  },
  {
    slug: 'baikonur',
    name: 'Baikonur',
    pages: [
      { url: 'baikonur/de/index.html', lang: 'de' },
      { url: 'baikonur/en/index.html', lang: 'en' }
    ]
  },
  {
    slug: 'quatsch',
    name: 'Quatsch (Additional)',
    pages: [
      { url: 'quatsch/index.html' }
    ]
  },
  {
    slug: 'vom-lokfuehrer-der-die-liebe-suchte',
    name: 'Vom Lokführer (Additional)',
    pages: [
      { url: 'vom-lokfuehrer-der-die-liebe-suchte/index.html' }
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

async function capturePage(browser, site, pageConfig) {
  const langSuffix = pageConfig.lang ? `_${pageConfig.lang}` : '';
  const pageSuffix = pageConfig.page ? `_${pageConfig.page}` : '';
  const ruffleDir = path.join('legacy/movie-websites', site.slug, 'ruffle');
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();
  
  let screenshotCount = 0;
  
  try {
    const url = `${BASE_URL}/${pageConfig.url}`;
    console.log(`    Loading: ${pageConfig.url}`);
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(3000);
    
    // Initial capture
    const initialPath = path.join(ruffleDir, `${site.slug}${langSuffix}${pageSuffix}_page_01.png`);
    await page.screenshot({ path: initialPath, fullPage: true });
    console.log(`      ✓ Page captured`);
    screenshotCount++;
    
    // Try to find and capture interactive elements
    const links = await page.$$('a[href], button, .button');
    if (links.length > 0 && links.length < 30) {
      console.log(`      Found ${links.length} links/buttons`);
      
      for (let i = 0; i < Math.min(links.length, 5); i++) {
        try {
          const link = links[i];
          const box = await link.boundingBox();
          
          if (box) {
            // Hover
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await sleep(500);
            
            const hoverPath = path.join(ruffleDir, `${site.slug}${langSuffix}${pageSuffix}_hover_${i + 1}_01.png`);
            await page.screenshot({ path: hoverPath, fullPage: false });
            screenshotCount++;
            
            // Click and capture
            const href = await link.getAttribute('href').catch(() => null);
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
              await link.click({ timeout: 2000 }).catch(() => {});
              await sleep(2000);
              
              const clickPath = path.join(ruffleDir, `${site.slug}${langSuffix}${pageSuffix}_subpage_${i + 1}_01.png`);
              await page.screenshot({ path: clickPath, fullPage: true });
              console.log(`      ✓ Subpage ${i + 1}`);
              screenshotCount++;
              
              await page.goBack({ timeout: 5000 }).catch(() => {});
              await sleep(1000);
            }
          }
        } catch (error) {
          continue;
        }
      }
    }
    
    // Scroll capture
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    
    if (pageHeight > viewportHeight * 1.5) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await sleep(500);
      
      const scrollPath = path.join(ruffleDir, `${site.slug}${langSuffix}${pageSuffix}_scrolled_01.png`);
      await page.screenshot({ path: scrollPath, fullPage: false });
      screenshotCount++;
    }
    
  } catch (error) {
    console.error(`      ✗ Error: ${error.message}`);
  } finally {
    await context.close();
  }
  
  return screenshotCount;
}

async function captureSite(browser, site) {
  console.log(`\n  📽️  ${site.name}`);
  console.log('  ' + '─'.repeat(58));
  
  const ruffleDir = path.join('legacy/movie-websites', site.slug, 'ruffle');
  await ensureDirectory(ruffleDir);
  
  let totalScreenshots = 0;
  
  for (const pageConfig of site.pages) {
    const count = await capturePage(browser, site, pageConfig);
    totalScreenshots += count;
  }
  
  console.log(`  📊 Total: ${totalScreenshots} screenshots\n`);
  return totalScreenshots;
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  🎬 Remaining Sites Capture (Phase 3)                         ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  // Test server
  try {
    const testBrowser = await chromium.launch({ headless: true });
    const testContext = await testBrowser.newContext();
    const testPage = await testContext.newPage();
    await testPage.goto(BASE_URL, { timeout: 5000 });
    await testContext.close();
    await testBrowser.close();
    console.log('✓ Server running\n');
  } catch (error) {
    console.error('✗ Server not accessible\n');
    process.exit(1);
  }
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let grandTotal = 0;
  
  for (const site of SITES) {
    const count = await captureSite(browser, site);
    grandTotal += count;
  }
  
  await browser.close();
  
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  ✅ Remaining Sites Complete                                   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  console.log(`📊 Total screenshots: ${grandTotal}\n`);
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
