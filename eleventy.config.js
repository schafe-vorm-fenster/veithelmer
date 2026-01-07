const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

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
  
  // Copy film assets
  eleventyConfig.addPassthroughCopy({ "content/films": "assets/films" });
  
  // Films Collection - Load from content directory
  eleventyConfig.addCollection("films", function() {
    const filmFiles = glob.sync("content/films/*/index_en.md");
    
    const films = [];
    filmFiles.forEach(filePath => {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const parsed = matter(content);
        const slug = path.basename(path.dirname(filePath));
        
        films.push({
          data: parsed.data,
          content: parsed.content,
          fileSlug: slug,
          url: `/films/${slug}/`
        });
      } catch (error) {
        console.warn(`⚠️  Skipping ${filePath}: ${error.message}`);
      }
    });
    
    return films;
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
