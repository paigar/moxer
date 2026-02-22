module.exports = function(eleventyConfig) {
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch CSS and JS changes
  eleventyConfig.addWatchTarget("src/assets/");

  // Filters
  eleventyConfig.addFilter("slice", (arr, start, end) => arr.slice(start, end));
  eleventyConfig.addFilter("countUniqueBy", (arr, key) => new Set(arr.map(i => i[key])).size);
  eleventyConfig.addFilter("groupBy", (arr, key) => {
    const groups = {};
    arr.forEach(item => {
      const val = item[key];
      if (!groups[val]) groups[val] = [];
      groups[val].push(item);
    });
    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  });
  eleventyConfig.addFilter("exclude", (arr, key, value) => arr.filter(i => i[key] !== value));

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
