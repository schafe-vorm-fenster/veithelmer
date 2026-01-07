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
  
  // Passthrough copy for film assets (posters, trailers, images)
  eleventyConfig.addPassthroughCopy({
    "content/films": "assets/films"
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
  
  // Filter to categorize films by duration (Feature >60min, Short <=60min)
  eleventyConfig.addFilter("categorizeFilms", function(films) {
    const categories = {
      feature: [],
      documentary: [],
      short: []
    };
    
    films.forEach(film => {
      const duration = film.data.duration || "";
      const technical = film.data.technical_specs || "";
      const minutes = parseInt(duration);
      
      if (technical.includes("Documentary") || technical.includes("documentary")) {
        categories.documentary.push(film);
      } else if (minutes > 60) {
        categories.feature.push(film);
      } else {
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
  
  // Set input/output directories
  return {
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
