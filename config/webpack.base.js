/* eslint-disable @typescript-eslint/no-var-requires */
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // Where webpack looks to start building the bundle and include polyfill
  entry: `${paths.src}/index.tsx`,

  // Usually configured as 'errors-only'
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
    mainFields: ['jsnext:main', 'browser', 'main'],
    alias: {
      '@components': paths.components,
      '@images': paths.images,
      '@styles': paths.styles
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Webpack5 Boilerplate',
      template: `${paths.public}/index.html`, // template file
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

      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' }
    ]
  }
}
