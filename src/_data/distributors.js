const site = require("./site.json");
const ADMIN_URL = site.adminUrl;

module.exports = async function () {
  let res;
  try {
    res = await fetch(`${ADMIN_URL}/distributors.json`);
  } catch (err) {
    throw new Error(`No se pudo conectar con ${ADMIN_URL}/distributors.json — ${err.message}`);
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener ${ADMIN_URL}/distributors.json`);
  }

  return res.json();
};
