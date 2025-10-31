const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@data": path.resolve(__dirname, "src/data"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
};
