const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const siteData = require('./src/_data/site.js');

module.exports = function(eleventyConfig) {
  // CSS processing with Tailwind v4 via eleventy.before hook
  eleventyConfig.on('eleventy.before', async () => {
    const inputCss = path.join(__dirname, 'src/css/main.css');
    const outputCss = path.join(__dirname, '_site/css/main.css');
    const outputDir = path.dirname(outputCss);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Run PostCSS with Tailwind v4
    try {
      execSync(`npx postcss "${inputCss}" -o "${outputCss}" --verbose`, {
        stdio: 'inherit'
      });
      console.log('✅ CSS processed with Tailwind v4 via PostCSS');
    } catch (error) {
      console.error('❌ CSS processing failed:', error);
      throw error;
    }
  });
  
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  
  // Passthrough copy for film assets (posters, trailers, images)
  eleventyConfig.addPassthroughCopy({
    "content/films": "assets/films"
  });
  
  // Passthrough copy for page assets (images)
  eleventyConfig.addPassthroughCopy({
    "content/pages": "assets/pages"
  });
  
  // Passthrough copy for film microsites
  eleventyConfig.addPassthroughCopy({
    "content/films/the-bra/site": "movie-websites/the-bra"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/site": "movie-websites/gate-to-heaven"
  });
  // Baikonur microsite
  eleventyConfig.addPassthroughCopy({
    "content/films/baikonur/site/de": "de/baikonur/microsite"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/baikonur/site/en": "en/baikonur/microsite"
  });
  // Copy assets to English version (de will be copied in after hook)
  eleventyConfig.addPassthroughCopy({
    "content/films/baikonur/site/assets": "en/baikonur/microsite/assets"
  });
  
  // The Bra microsite
  eleventyConfig.addPassthroughCopy({
    "content/films/the-bra/site/de": "de/the-bra/microsite"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/the-bra/site/en": "en/the-bra/microsite"
  });
  // Copy assets to English version (de will be copied in after hook)
  eleventyConfig.addPassthroughCopy({
    "content/films/the-bra/site/assets": "en/the-bra/microsite/assets"
  });
  
  // Behind the Couch microsite
  eleventyConfig.addPassthroughCopy({
    "content/films/behind-the-couch/site/de": "de/behind-the-couch/microsite"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/behind-the-couch/site/en": "en/behind-the-couch/microsite"
  });
  // Copy shared files (CSS, JS, img, ruffle) to both language versions
  eleventyConfig.addPassthroughCopy({
    "content/films/behind-the-couch/site/behindthecouch.css": "en/behind-the-couch/microsite/behindthecouch.css"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/behind-the-couch/site/behindthecouch.js": "en/behind-the-couch/microsite/behindthecouch.js"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/behind-the-couch/site/img": "en/behind-the-couch/microsite/img"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/behind-the-couch/site/ruffle": "en/behind-the-couch/microsite/ruffle"
  });
  
  // Absurdistan microsite
  eleventyConfig.addPassthroughCopy({
    "content/films/absurdistan/site/de": "de/absurdistan/microsite"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/absurdistan/site/en": "en/absurdistan/microsite"
  });
  // Copy shared files (CSS, JS, img) to English version
  eleventyConfig.addPassthroughCopy({
    "content/films/absurdistan/site/gallery.css": "en/absurdistan/microsite/gallery.css"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/absurdistan/site/gallery.js": "en/absurdistan/microsite/gallery.js"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/absurdistan/site/img": "en/absurdistan/microsite/img"
  });
  
  // Gate to Heaven microsite
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/site/de": "de/gate-to-heaven/microsite"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/site/en": "en/gate-to-heaven/microsite"
  });
  // Copy shared files (CSS, JS, img) to English version
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/site/styles.css": "en/gate-to-heaven/microsite/styles.css"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/site/script.js": "en/gate-to-heaven/microsite/script.js"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/site/img": "en/gate-to-heaven/microsite/img"
  });
  // Copy trailer video to both microsites (for local reference from de/trailer.html)
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/trailer.mp4": "de/gate-to-heaven/microsite/trailer.mp4"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/gate-to-heaven/trailer.mp4": "en/gate-to-heaven/microsite/trailer.mp4"
  });
  
  // Tuvalu microsite
  eleventyConfig.addPassthroughCopy({
    "content/films/tuvalu/site/de": "de/tuvalu/microsite"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/tuvalu/site/en": "en/tuvalu/microsite"
  });
  // Copy shared files (CSS, JS, img) to English version
  eleventyConfig.addPassthroughCopy({
    "content/films/tuvalu/site/styles.css": "en/tuvalu/microsite/styles.css"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/tuvalu/site/script.js": "en/tuvalu/microsite/script.js"
  });
  eleventyConfig.addPassthroughCopy({
    "content/films/tuvalu/site/img": "en/tuvalu/microsite/img"
  });
  
  // Fiddlesticks (Quatsch) microsite - bilingual with shared assets
  // (Assets are copied in eleventy.after hook below)
  
  // After build, copy HTML files and other assets
  eleventyConfig.on('eleventy.after', async () => {
    const fse = require('fs-extra');
    
    // Copy German and English HTML versions for Fiddlesticks
    await fse.copy(
      'content/films/fiddlesticks/site/de.html',
      '_site/de/fiddlesticks/microsite/index.html'
    );
    
    await fse.copy(
      'content/films/fiddlesticks/site/en.html',
      '_site/en/fiddlesticks/microsite/index.html'
    );
    
    // Copy shared assets to both language versions
    const sharedAssets = ['imgs', 'vendors', 'downloads', 'examples.css', 'examples.js', 
                          'jquery.fullPage.css', 'jquery.fullPage.js', 'jquery.fullPage.min.js', 'stylesheet.css'];
    
    for (const asset of sharedAssets) {
      const src = `content/films/fiddlesticks/site/${asset}`;
      const deDest = `_site/de/fiddlesticks/microsite/${asset}`;
      const enDest = `_site/en/fiddlesticks/microsite/${asset}`;
      
      if (await fse.pathExists(src)) {
        await fse.copy(src, deDest);
        await fse.copy(src, enDest);
      }
    }
    
    console.log('✅ Copied Fiddlesticks bilingual HTML and shared assets');
    
    // Baikonur assets
    const baikonurSrcAssets = path.join(__dirname, 'content/films/baikonur/site/assets');
    const baikonurDestAssets = path.join(__dirname, '_site/de/baikonur/microsite/assets');
    await fse.copy(baikonurSrcAssets, baikonurDestAssets);
    console.log('✅ Copied Baikonur assets to German microsite');
    
    // The Bra assets
    const braSrcAssets = path.join(__dirname, 'content/films/the-bra/site/assets');
    const braDestAssets = path.join(__dirname, '_site/de/the-bra/microsite/assets');
    await fse.copy(braSrcAssets, braDestAssets);
    console.log('✅ Copied The Bra assets to German microsite');
    
    // Behind the Couch shared files
    const btcSrcCss = path.join(__dirname, 'content/films/behind-the-couch/site/behindthecouch.css');
    const btcDestCss = path.join(__dirname, '_site/de/behind-the-couch/microsite/behindthecouch.css');
    await fse.copy(btcSrcCss, btcDestCss);
    
    const btcSrcJs = path.join(__dirname, 'content/films/behind-the-couch/site/behindthecouch.js');
    const btcDestJs = path.join(__dirname, '_site/de/behind-the-couch/microsite/behindthecouch.js');
    await fse.copy(btcSrcJs, btcDestJs);
    
    const btcSrcImg = path.join(__dirname, 'content/films/behind-the-couch/site/img');
    const btcDestImg = path.join(__dirname, '_site/de/behind-the-couch/microsite/img');
    await fse.copy(btcSrcImg, btcDestImg);
    
    const btcSrcRuffle = path.join(__dirname, 'content/films/behind-the-couch/site/ruffle');
    const btcDestRuffle = path.join(__dirname, '_site/de/behind-the-couch/microsite/ruffle');
    if (await fse.pathExists(btcSrcRuffle)) {
      await fse.copy(btcSrcRuffle, btcDestRuffle);
    }
    console.log('✅ Copied Behind the Couch shared files to German microsite');
    
    // Absurdistan shared files
    const absSrcCss = path.join(__dirname, 'content/films/absurdistan/site/gallery.css');
    const absDestCss = path.join(__dirname, '_site/de/absurdistan/microsite/gallery.css');
    await fse.copy(absSrcCss, absDestCss);
    
    const absSrcJs = path.join(__dirname, 'content/films/absurdistan/site/gallery.js');
    const absDestJs = path.join(__dirname, '_site/de/absurdistan/microsite/gallery.js');
    await fse.copy(absSrcJs, absDestJs);
    
    const absSrcImg = path.join(__dirname, 'content/films/absurdistan/site/img');
    const absDestImg = path.join(__dirname, '_site/de/absurdistan/microsite/img');
    await fse.copy(absSrcImg, absDestImg);
    console.log('✅ Copied Absurdistan shared files to German microsite');
    
    // Gate to Heaven shared files
    const gthSrcCss = path.join(__dirname, 'content/films/gate-to-heaven/site/styles.css');
    const gthDestCss = path.join(__dirname, '_site/de/gate-to-heaven/microsite/styles.css');
    await fse.copy(gthSrcCss, gthDestCss);
    
    const gthSrcJs = path.join(__dirname, 'content/films/gate-to-heaven/site/script.js');
    const gthDestJs = path.join(__dirname, '_site/de/gate-to-heaven/microsite/script.js');
    await fse.copy(gthSrcJs, gthDestJs);
    
    const gthSrcImg = path.join(__dirname, 'content/films/gate-to-heaven/site/img');
    const gthDestImg = path.join(__dirname, '_site/de/gate-to-heaven/microsite/img');
    await fse.copy(gthSrcImg, gthDestImg);
    
    // Copy trailer to German microsite
    const gthSrcTrailer = path.join(__dirname, 'content/films/gate-to-heaven/trailer.mp4');
    const gthDestTrailerDe = path.join(__dirname, '_site/de/gate-to-heaven/microsite/trailer.mp4');
    await fse.copy(gthSrcTrailer, gthDestTrailerDe);
    console.log('✅ Copied Gate to Heaven shared files to German microsite');
    
    // Tuvalu shared files
    const tuvaluSrcCss = path.join(__dirname, 'content/films/tuvalu/site/styles.css');
    const tuvaluDestCss = path.join(__dirname, '_site/de/tuvalu/microsite/styles.css');
    await fse.copy(tuvaluSrcCss, tuvaluDestCss);
    
    const tuvaluSrcJs = path.join(__dirname, 'content/films/tuvalu/site/script.js');
    const tuvaluDestJs = path.join(__dirname, '_site/de/tuvalu/microsite/script.js');
    await fse.copy(tuvaluSrcJs, tuvaluDestJs);
    
    const tuvaluSrcImg = path.join(__dirname, 'content/films/tuvalu/site/img');
    const tuvaluDestImg = path.join(__dirname, '_site/de/tuvalu/microsite/img');
    await fse.copy(tuvaluSrcImg, tuvaluDestImg);
    console.log('✅ Copied Tuvalu shared files to German microsite');
  });
  
  // Films collection (all locales)
  eleventyConfig.addCollection("films", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/films/*/index_*.md");
  });
  
  // English films only
  eleventyConfig.addCollection("films_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/films/*/index_en.md")
      .sort((a, b) => (b.data.release_year || 0) - (a.data.release_year || 0));
  });
  
  // German films only
  eleventyConfig.addCollection("films_de", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/films/*/index_de.md")
      .sort((a, b) => (b.data.release_year || 0) - (a.data.release_year || 0));
  });
  
  // Workshops collection (all locales)
  eleventyConfig.addCollection("workshops", function(collectionApi) {
    return collectionApi.getFilteredByTag("workshop");
  });
  
  // English workshops only
  eleventyConfig.addCollection("workshops_en", function(collectionApi) {
    return collectionApi.getFilteredByTag("workshop")
      .filter(item => item.data.language === 'en');
  });
  
  // German workshops only
  eleventyConfig.addCollection("workshops_de", function(collectionApi) {
    return collectionApi.getFilteredByTag("workshop")
      .filter(item => item.data.language === 'de');
  });
  
  // Filter to categorize films by category field in frontmatter
  eleventyConfig.addFilter("categorizeFilms", function(films) {
    const categories = {
      feature: [],
      documentary: [],
      short: []
    };
    
    films.forEach(film => {
      const category = film.data.category || "";
      
      if (category === "documentary") {
        categories.documentary.push(film);
      } else if (category === "feature") {
        categories.feature.push(film);
      } else {
        // Default to short film
        categories.short.push(film);
      }
    });
    
    // Sort each category by year (newest first)
    Object.keys(categories).forEach(key => {
      categories[key].sort((a, b) => {
        const yearA = a.data.release_year || 0;
        const yearB = b.data.release_year || 0;
        return yearB - yearA;
      });
    });
    
    return categories;
  });
  
  // Filter to convert duration to ISO 8601 format (e.g., "90 min" -> "PT1H30M")
  eleventyConfig.addFilter("durationToISO8601", function(duration) {
    if (!duration) return null;
    
    // Extract minutes from string like "90 minutes", "92 min", "90", etc.
    const match = duration.match(/(\d+)/);
    if (!match) return null;
    
    const totalMinutes = parseInt(match[1]);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    let result = "PT";
    if (hours > 0) result += hours + "H";
    if (minutes > 0) result += minutes + "M";
    
    return result;
  });

  // I18n filter to get translated strings
  eleventyConfig.addFilter("t", function(key, locale) {
    const i18n = require('./src/_data/i18n.json');
    const lang = locale || 'en';
    const keys = key.split('.');
    let value = i18n[lang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value;
  });
  
  // Filter to get alternate language URL
  eleventyConfig.addFilter("alternateUrl", function(url, targetLocale) {
    if (!url) return '/';
    
    // Get pathPrefix - use the same value as configured
    const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || siteData.pathPrefix;
    
    // Strip pathPrefix from url if present
    let workingUrl = url;
    if (pathPrefix && workingUrl.startsWith(pathPrefix)) {
      workingUrl = workingUrl.substring(pathPrefix.length);
    }
    
    // Replace /de/ with /en/ or vice versa
    let alternateUrl;
    if (targetLocale === 'de') {
      alternateUrl = workingUrl.replace(/^\/en\//, '/de/');
    } else {
      alternateUrl = workingUrl.replace(/^\/de\//, '/en/');
    }
    
    // Apply pathPrefix back if configured
    // Remove trailing slash from pathPrefix to avoid double slashes
    if (pathPrefix) {
      const cleanPrefix = pathPrefix.replace(/\/$/, '');
      return cleanPrefix + alternateUrl;
    }
    return alternateUrl;
  });
  
  // Filter to extract locale from URL or page data
  eleventyConfig.addFilter("getLocale", function(page) {
    if (page.url && page.url.startsWith('/de/')) {
      return 'de';
    }
    return 'en';
  });

  // Filter to generate Schema.org Movie structured data
  eleventyConfig.addFilter("generateMovieSchema", function(data, page) {
    const filmSlug = page.filePathStem.split('/').slice(-2)[0];
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Movie",
      "name": data.title,
      "description": data.description
    };

    if (data.director) {
      schema.director = {
        "@type": "Person",
        "name": data.director
      };
    }

    if (data.release_year) {
      schema.datePublished = `${data.release_year}-01-01`;
    }

    if (data.duration) {
      const match = data.duration.match(/(\d+)/);
      if (match) {
        const totalMinutes = parseInt(match[1]);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        let isoDuration = "PT";
        if (hours > 0) isoDuration += hours + "H";
        if (minutes > 0) isoDuration += minutes + "M";
        schema.duration = isoDuration;
      }
    }

    if (data.country) {
      schema.countryOfOrigin = {
        "@type": "Country",
        "name": data.country
      };
    }

    if (data.cast && data.cast.length > 0) {
      schema.actor = data.cast.map(actor => ({
        "@type": "Person",
        "name": actor
      }));
    }

    // Use cinema_poster if available, otherwise fall back to poster_image
    const imageFile = data.cinema_poster || data.poster_image;
    if (imageFile) {
      schema.image = `${siteData.url}/assets/films/${filmSlug}/${imageFile}`;
    }

    if (data.trailer_video) {
      const videoObject = {
        "@type": "VideoObject",
        "name": `${data.title} - Trailer`,
        "description": `Trailer for ${data.title}`,
        "contentUrl": `${siteData.url}/assets/films/${filmSlug}/${data.trailer_video}`
      };
      
      if (data.release_year) {
        videoObject.uploadDate = `${data.release_year}-01-01`;
      }
      
      if (data.trailer_poster) {
        videoObject.thumbnailUrl = `${siteData.url}/assets/films/${filmSlug}/${data.trailer_poster}`;
      } else if (data.poster_image) {
        videoObject.thumbnailUrl = `${siteData.url}/assets/films/${filmSlug}/${data.poster_image}`;
      }
      
      schema.trailer = videoObject;
    }

    if (data.awards && data.awards.length > 0) {
      schema.award = data.awards.map(award => {
        if (typeof award === 'string') {
          return award;
        } else {
          return Object.entries(award).map(([key, value]) => `${key}: ${value}`).join(', ');
        }
      });
    }

    return JSON.stringify(schema, null, 2);
  });
  
  // Watch targets for live reload
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");
  eleventyConfig.addWatchTarget("content/");
  
  // Ignore phase reports and documentation files in root
  eleventyConfig.ignores.add("PHASE_*.md");
  eleventyConfig.ignores.add("*.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("project-management/**");
  eleventyConfig.ignores.add("legacy/**");
  eleventyConfig.ignores.add("legacy-archives/**");
  eleventyConfig.ignores.add("scripts/**");
  eleventyConfig.ignores.add("**/TRAILER_SOURCE.md");
  eleventyConfig.ignores.add("**/POSTER_SOURCES.md");
  // Ignore microsite files since they're handled by passthrough copy
  eleventyConfig.ignores.add("content/films/*/site/**");
  
  // Set input/output directories
  return {
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || siteData.pathPrefix,
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
      layouts: "src/_layouts",
      data: "src/_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
