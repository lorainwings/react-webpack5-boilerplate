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

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: { localIdentName: '[name]__[local]__[hash:base64:5]' }
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      }
    ]
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
  },

  experiments: {
    lazyCompilation: true
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false, // 关闭分包
    minimize: false, // 关闭压缩
    concatenateModules: false, // 关闭模块合并
    usedExports: false // 关闭tree-shaking
  }
})
