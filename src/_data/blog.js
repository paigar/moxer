const site = require("./site.json");
const ADMIN_URL = site.adminUrl;

module.exports = async function () {
  let res;
  try {
    res = await fetch(`${ADMIN_URL}/blog.json`);
  } catch (err) {
    throw new Error(`No se pudo conectar con ${ADMIN_URL}/blog.json — ${err.message}`);
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener ${ADMIN_URL}/blog.json`);
  }

  const data = await res.json();

  return data.map((article) => ({
    ...article,
    image: article.image ? `${ADMIN_URL}${article.image}` : article.image,
  }));
};
