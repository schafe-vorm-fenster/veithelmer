const puppeteer = require('puppeteer');

async function extractVideoUrl(url) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Capture network requests
  const videoUrls = [];
  
  page.on('response', async (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    
    // Look for video URLs (m3u8, mp4, etc.)
    if (url.includes('.m3u8') || url.includes('.mp4') || 
        contentType.includes('video') || 
        contentType.includes('mpegurl') ||
        url.includes('master.m3u8')) {
      console.log('Found video URL:', url);
      videoUrls.push(url);
    }
  });
  
  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait a bit for video to start loading
    await page.waitForTimeout(5000);
    
    // Try to click play button if it exists
    try {
      await page.click('button[class*="play"]', { timeout: 2000 });
      await page.waitForTimeout(3000);
    } catch (e) {
      // Play button might not exist or auto-playing
    }
    
    // Check for video element source
    const videoSrc = await page.evaluate(() => {
      const video = document.querySelector('video');
      if (video) {
        return video.src || video.currentSrc || null;
      }
      return null;
    });
    
    if (videoSrc && !videoSrc.startsWith('blob:')) {
      console.log('Video src from element:', videoSrc);
      videoUrls.push(videoSrc);
    }
    
    console.log('\n=== All found video URLs ===');
    videoUrls.forEach(url => console.log(url));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

const url = process.argv[2];
if (!url) {
  console.error('Usage: node extract-video-url.js <url>');
  process.exit(1);
}

extractVideoUrl(url);
