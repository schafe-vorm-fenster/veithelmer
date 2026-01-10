module.exports = {
  // Base URL without trailing slash
  baseUrl: "https://schafe-vorm-fenster.github.io",
  
  // Path prefix for GitHub Pages subfolder deployment
  pathPrefix: "/veithelmer",
  
  // Full site URL
  get url() {
    return this.baseUrl + this.pathPrefix;
  },
  
  // Site metadata
  title: "Veit Helmer - Filmmaker",
  description: "Official website of Veit Helmer, award-winning filmmaker known for Tuvalu, Baikonur, and The Bra.",
  author: "Veit Helmer"
};
