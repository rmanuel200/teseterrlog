var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  
  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'ediscovery'),
        //loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'ediscovery'),
        use: 'raw-loader'
      },      
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'ediscovery'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','sass-loader'] })
      },  
      {
        test: /\.scss$/,
        include: helpers.root('src', 'ediscovery'),
        use: ['raw-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.ts$/,
        use: [{
        	loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('', 'tsconfig.json') }
          }, 
          'angular2-template-loader'
        ]
      }
    ]
  },

  plugins: [
	  
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      //baseUrl: process.env.NODE_ENV == 'development' ? '/' : '/ediscovery/'
      baseUrl: '/'
    })
  ]
};