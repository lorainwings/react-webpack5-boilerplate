/* eslint-disable @typescript-eslint/no-var-requires */
const paths = require('./paths')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpackBar = require('webpackbar')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')

const __CDN__ = 'http://localhost:8080/'
const __PROFILE__ = process.env.PROFILE === 'analysis'

module.exports = merge(base, {
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
    new webpackBar(),
    __PROFILE__ && new BundleAnalyzerPlugin()
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: { localIdentName: '[name]__[local]__[hash:base64:5]' }
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
          dataUrlCondition: { maxSize: 1024 }
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              // jpeg minimize
              mozjpeg: { quality: 80 },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false },
              // the webp option will enable WEBP
              webp: { quality: 75 }
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
    usedExports: true, // Tree Shaking
    concatenateModules: true, //  Scope Hoisting
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({ parallel: 4 }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            reduce_vars: true,
            pure_funcs: ['console.log']
          }
        }
      }),
      '...' // Preserv the default `minimizer`
    ],
    runtimeChunk: { name: 'runtime' },
    splitChunks: { chunks: 'all', name: (_, c, k) => k }
  },

  performance: {
    // `error` | `warning` | false
    hints: false,
    // all chunk size limit
    maxEntrypointSize: 500 * 1024,
    // entry chunk size limit
    maxAssetSize: 172 * 1024,
    assetFilter: (n) => n.endsWith('.js')
  }
})
