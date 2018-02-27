const path = require('path');

module.exports = {
  entry: "./client/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets:['es2015']
        }
      }
    ]
  },
  stats:{
    colors:true
  }
}
