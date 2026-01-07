const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
      execSync(`npx postcss ${inputCss} -o ${outputCss} --verbose`, {
        stdio: 'inherit'
      });
      console.log('✅ CSS processed with Tailwind v4 via PostCSS');
    } catch (error) {
      console.error('❌ CSS processing failed:', error);
      throw error;
    }
  });
  
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Watch targets for live reload
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");
  
  // Set input/output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
