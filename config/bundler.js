const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const webpackConfig = require('./webpack.development.config.js');
const PATHS = require('./paths');

module.exports = function (devPort) {
  let bundleStart = null;
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    const ms = Date.now() - bundleStart;
    console.log(`Bundled in ${ms} ms!`);

    const baseUrl = `localhost:${devPort}`;
    const hotUrl = `${baseUrl}/webpack/hot/dev-server`;
    const inlineUrl = `${baseUrl}/webpack-dev-server/client?http://${baseUrl}`;

    console.log('See bundled results:');
    console.log(`- hot reloaded: ${hotUrl}`);
    console.log(`- inline reloaded: ${inlineUrl}`);
  });

  const bundler = new webpackDevServer(compiler, {
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    },
    historyApiFallback: true,
    contentBase: PATHS.PUBLIC
  });

  bundler.listen(devPort, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
};
