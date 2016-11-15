const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const PATHS = require('./paths');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server', // hot reloading url
    'webpack-dev-server/client?http://localhost:8080', // inline loading url
    `${PATHS.SEMANTIC_UI}/semantic.js`,
    `${PATHS.SEMANTIC_UI}/semantic.css`,
    `${PATHS.SRC}/index.jsx`,
  ],
  output: {
    path: PATHS.BUILD,
    publicPath: 'build',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new DotenvPlugin({
      sample: './config/env_template',
      path: './.env'
    })
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        include: PATHS.SRC,
        test: /\.jsx?/,
        query: {
          cacheDirectory: true
        }
      },
      {
        loader: ExtractTextPlugin.extract('css?inlineSourceMap'),
        include: PATHS.SEMANTIC_UI,
        test: /\.css$/,
      },
      {
        loader: 'file',
        include: PATHS.SEMANTIC_UI,
        test: /\.(eot|png|woff|woff2|svg|ttf)$/,
      }
    ]
  }
};
