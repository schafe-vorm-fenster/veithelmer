module.exports = {
  layout: "film.njk",
  eleventyComputed: {
    permalink: function(data) {
      // Extract language from filename (index_en.md -> en, index_de.md -> de)
      const lang = data.language || data.page.fileSlug.split('_')[1] || 'en';
      
      // Get the parent directory name (film slug)
      const filmSlug = data.page.filePathStem.split('/').slice(-2)[0];
      
      // Generate permalink: /en/tuvalu/ or /de/tuvalu/
      return `/${lang}/${filmSlug}/`;
    },
    locale: function(data) {
      // Set locale based on language field or extracted from filename
      return data.language || data.page.fileSlug.split('_')[1] || 'en';
    }
  },
  tags: "film"
};
