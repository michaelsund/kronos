const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const config = require('../src/config');
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, '/src/');
const fontPath = path.join(rootPath, '/fonts/');
const distPath = path.join(rootPath, '/build/');

const webpackConfig = {
  target: 'electron',
  context: path.resolve(__dirname, '..'),
  devtool: false,
  entry: {
    main: ['babel-polyfill', srcPath + 'electron']
  },
  output: {
    path: distPath,
    filename: 'main.js'
  },
  module: {
    exclude: /node_modules/,
    loaders: [
      {
        test: /\.(jsx|js)$/,
        include: srcPath,
        loaders: ['babel']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /pdfkit[\/\\]js[\/\\]mixins[\/\\]fonts.js$/, loader: StringReplacePlugin.replace({
  				replacements: [
  					{
  						pattern: 'return this.font(\'Helvetica\');',
  						replacement: function () {
  							return '';
  						}
  					}
		      ]
        })
			},
			{
        test: /fontkit[\/\\]index.js$/, loader: StringReplacePlugin.replace({
  				replacements: [
  					{
  						pattern: /fs\./g,
  						replacement: function () {
  							return 'require(\'fs\').';
  						}
  					}
		      ]
        })
			},
      {enforce: 'post', test: /fontkit[\/\\]index.js$/, loader: "transform?brfs"},
    	{enforce: 'post', test: /unicode-properties[\/\\]index.js$/, loader: "transform?brfs"},
    	{enforce: 'post', test: /linebreak[\/\\]src[\/\\]linebreaker.js/, loader: "transform?brfs"}
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
        drop_debugger: true,
        drop_console: true
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}

module.exports = webpackConfig;
