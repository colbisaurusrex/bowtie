const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(css|sass)$/,
        loaders: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: { mimetype: 'image/png' },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
    new UglifyJSPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
