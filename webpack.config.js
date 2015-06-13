var webpack = require('webpack');

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
      {test: /\.vue$/, loader: "vue-loader"}
    ]
  },

  devtool: "#source-map",
};
