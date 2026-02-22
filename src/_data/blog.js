const site = require("./site.json");
const ADMIN_URL = site.adminUrl;

module.exports = async function () {
  const res = await fetch(`${ADMIN_URL}/blog.json`);
  const data = await res.json();

  return data.map((article) => ({
    ...article,
    image: article.image ? `${ADMIN_URL}${article.image}` : article.image,
  }));
};
