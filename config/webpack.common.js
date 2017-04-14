/*Images, fonts from css go to public path on env, assets are also copied over*/

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
        exclude: helpers.root('src', ''),
        //loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', ''),
        use: 'raw-loader'
      },      
      {
        test: /\.scss$/,
        exclude: helpers.root('src', ''),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','sass-loader'] })
      },  
      {
        test: /\.scss$/,
        include: helpers.root('src', ''),
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
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      baseUrl: '/'
    }),
    
    new CopyWebpackPlugin([{
        context: './src/assets',
        from: '**/*',
        to: 'assets',
        toType: 'dir', 
        force: true
    }])
  ]
};