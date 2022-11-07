/* eslint-disable @typescript-eslint/no-var-requires */
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // Where webpack looks to start building the bundle and include polyfill
  entry: `${paths.src}/index.tsx`,

  stats: {
    chunks: false,
    assetsSpace: 1,
    moduleAssets: false,
    modules: false,
    builtAt: true,
    timings: true,
    hash: true
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: ['node_modules', paths.src],
    alias: {
      '@components': paths.components,
      '@images': paths.images,
      '@styles': paths.styles
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: paths.public + '/index.html', // template file
      filename: 'index.html' // output file
    })
  ],

  module: {
    rules: [
      {
        test: /\.[jt](sx|s)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: { workers: 2 }
          },
          {
            loader: 'babel-loader',
            options: { compact: true, cacheDirectory: true }
          }
        ]
      },

      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },

      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' }
    ]
  }
}
