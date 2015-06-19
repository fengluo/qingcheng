var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");

module.exports = {
  entry: [
    "./lib/index.js"
  ],

  output: {
    path: __dirname + "/build/",
    filename: "build.js",
    publicPath: '/build/',
  },

  module: {
    loaders: [
      {
        test: /\.vue$/, loader: vue.withLoaders({
          css: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
        }),
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")}
    ]
  },

  plugins: [
    new ExtractTextPlugin("style.css", {disable: false})
  ],

  devtool: "#source-map",
};
