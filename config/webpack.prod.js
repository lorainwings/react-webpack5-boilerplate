/* eslint-disable @typescript-eslint/no-var-requires */
const paths = require('./paths')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpackBar = require('webpackbar')
const __CDN__ = 'http://localhost:8080/'

module.exports = merge(base, {
  mode: 'production',
  devtool: false,

  output: {
    clean: true,
    publicPath: __CDN__,
    path: paths.build,
    assetModuleFilename: 'assets/[name].[contenthash:4][ext]',
    filename: 'js/[name].[chunkhash:16].js',
    chunkFilename: 'js/[name].[chunkhash:16].js'
  },

  target: ['web', 'es5'],

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css'
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
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})
