module.exports = function(eleventyConfig) {
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch CSS and JS changes
  eleventyConfig.addWatchTarget("src/assets/");

  // Filters
  eleventyConfig.addFilter("slice", (arr, start, end) => arr.slice(start, end));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
