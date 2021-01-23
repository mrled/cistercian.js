module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/0",
      },
      {
        source: "/preview",
        destination: "/preview/0",
      },
    ];
  },
};
