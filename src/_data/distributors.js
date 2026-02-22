const site = require("./site.json");
const ADMIN_URL = site.adminUrl;

module.exports = async function () {
  const res = await fetch(`${ADMIN_URL}/distributors.json`);
  return res.json();
};
