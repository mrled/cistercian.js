module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/NaN",
      },
      {
        source: "/preview",
        destination: "/preview/0",
      },
    ];
  },
};
