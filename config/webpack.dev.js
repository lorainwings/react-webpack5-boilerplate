/* eslint-disable @typescript-eslint/no-var-requires */
const paths = require('./paths')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const eslintPlugin = require('eslint-webpack-plugin')
const base = require('./webpack.base.js')
const __BASEURL__ = '/'

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',

  output: {
    clean: true,
    publicPath: __BASEURL__,
    path: paths.build,
    assetModuleFilename: 'assets/[name].[ext]',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },

  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080
  },

  plugins: [new eslintPlugin(), new webpack.HotModuleReplacementPlugin()],

  cache: {
    type: 'filesystem',
    cacheDirectory: paths.cache,
    maxAge: 5 * 24 * 60 * 60 * 1000,
    buildDependencies: {
      config: [__filename]
    }
  }
})
