module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/0",
      },
    ];
  },
};
