const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
//  devtool: 'cheap-module-eval-source-map',
	//inline-source-map
  devtool: 'cheap-module-source-map',
  output: {
    path: helpers.root('./src'),
    publicPath: '/',
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[id].[hash].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('assets/[name].[hash].css')
  ],
  
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: false,
    port: 3001,
    host:""
  }
});
