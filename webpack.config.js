const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }
    )
  ],

  entry: './src/script/index.js',
  output : {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.s?css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
    ],
  },
  devServer: { contentBase: path.resolve(__dirname, 'dist') }
};