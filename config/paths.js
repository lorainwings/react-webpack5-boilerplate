/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist/'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  cache: path.resolve(__dirname, '../.cache'),

  components: path.resolve(__dirname, '../src/components/'),

  images: path.resolve(__dirname, '../src/assets/images/'),

  styles: path.resolve(__dirname, '../src/assets/styles/')
}
