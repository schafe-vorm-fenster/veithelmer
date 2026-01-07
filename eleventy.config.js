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

    if (data.poster_image) {
      schema.image = `https://veithelmer.com/assets/films/${filmSlug}/${data.poster_image}`;
    }

    if (data.trailer_video) {
      const videoObject = {
        "@type": "VideoObject",
        "name": `${data.title} - Trailer`,
        "description": `Trailer for ${data.title}`,
        "contentUrl": `https://veithelmer.com/assets/films/${filmSlug}/${data.trailer_video}`
      };
      
      if (data.release_year) {
        videoObject.uploadDate = `${data.release_year}-01-01`;
      }
      
      if (data.trailer_poster) {
        videoObject.thumbnailUrl = `https://veithelmer.com/assets/films/${filmSlug}/${data.trailer_poster}`;
      } else if (data.poster_image) {
        videoObject.thumbnailUrl = `https://veithelmer.com/assets/films/${filmSlug}/${data.poster_image}`;
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
  eleventyConfig.ignores.add("**/site/**");
  
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
