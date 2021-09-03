module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ],
    '@babel/preset-typescript'
  ],

  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@interfaces': './src/interfaces',
        '@utils': './src/utils'
      }
    }]
  ],

  ignore: ['./src/interfaces']
};
