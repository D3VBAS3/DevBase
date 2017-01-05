const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'js', 'app.js'),
  output: {
    path: path.join(__dirname, 'client', 'js'),
    publicPath: 'http://localhost:8080/client/static/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  },
  devServer: {
    contentBase: './client/static',
    port: 8080,
  }
}