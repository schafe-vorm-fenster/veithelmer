module.exports = {
  layout: "film.njk",
  permalink: function(data) {
    // Extract language from filename (index_en.md -> en, index_de.md -> de)
    const lang = data.page.fileSlug.split('_')[1] || 'en';
    
    // Get the parent directory name (film slug)
    const filmSlug = data.page.filePathStem.split('/').slice(-2)[0];
    
    // Generate permalink: /en/films/tuvalu/ or /de/films/tuvalu/
    return `/${lang}/films/${filmSlug}/index.html`;
  },
  tags: "film"
};
