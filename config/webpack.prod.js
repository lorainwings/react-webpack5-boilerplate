/* eslint-disable @typescript-eslint/no-var-requires */
const paths = require('./paths')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpackBar = require('webpackbar')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const __CDN__ = 'http://localhost:8080/'
const __PROFILE__ = process.env.PROFILE === 'analysis'

const config = merge(base, {
  mode: 'production',
  devtool: false,

  output: {
    clean: true,
    pathinfo: false,
    publicPath: __CDN__,
    path: paths.build,
    hashFunction: 'xxhash64',
    assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },

  target: ['web', 'es5'],

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
      chunkFilename: 'styles/[name].[contenthash:8].css'
    }),
    new webpackBar()
  ],

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024 // 1kb
          }
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              // jpeg 压缩配置
              mozjpeg: {
                quality: 80
              }
            }
          }
        ]
      }
    ]
  },

  optimization: {
    /* 生产模式默认开启 */
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    minimize: true,
    minimizer: [new CssMinimizerPlugin({ parallel: 4 }), '...'],
    runtimeChunk: { name: 'runtime' },
    splitChunks: { chunks: 'all' }
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})

if (__PROFILE__) config.plugins.push(new BundleAnalyzerPlugin())

module.exports = config
