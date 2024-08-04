const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: path.join(__dirname, "client.js"),
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9090,
  },
};
