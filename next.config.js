const { getRedirectStatus } = require("next/dist/lib/load-custom-routes");

module.exports = {
  async redirects() {
    return [
      {
        /* Redirect all /<number> request to /numeral/<number>,
         * EXCEPT for /404, which next.js uses as its 404 page.
         * I started with /<number> URLs,
         * but /404 did not show the Cistercian numerals for 404,
         * only the File Not Found error page.
         * I moved to /numeral/<number> URLs to fix this.
         * This redirect means old URLs still work.
         * NOTE: (?!404) excepts /404, and you can add others with a pipe like (?!404|405)
         */
        source: "/:number((?!404)\\d{1,})",
        destination: "/numeral/:number",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/numeral",
      },
      {
        source: "/numeral",
        destination: "/numeral/NaN",
      },
      {
        source: "/preview",
        destination: "/preview/0",
      },
    ];
  },
};
