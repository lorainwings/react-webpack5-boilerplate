module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // targets覆盖.browserslistrc
        // targets: { browsers: ['iOS >= 9', 'Android >= 4.4', 'last 2 versions', '> 0.2%', 'not dead'] },
        corejs: 3,
        useBuiltIns: 'usage'
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        optimizeConstEnums: true
      }
    ]
  ],
  plugins: [
    // 添加 transform-runtime 插件
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        regenerator: false
      }
    ]
  ]
}
