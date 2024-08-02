const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: "${__dirname}/dist",
  },
  devServer: {
    static: "./dist",
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
