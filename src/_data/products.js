const site = require("./site.json");
const ADMIN_URL = site.adminUrl;

module.exports = async function () {
  const res = await fetch(`${ADMIN_URL}/products.json`);
  const data = await res.json();

  return data.map((product) => ({
    ...product,
    image: product.image ? `${ADMIN_URL}${product.image}` : product.image,
    imageFront: product.imageFront
      ? `${ADMIN_URL}${product.imageFront}`
      : product.imageFront,
    images: product.images
      ? product.images.map((img) => `${ADMIN_URL}${img}`)
      : product.images,
  }));
};
