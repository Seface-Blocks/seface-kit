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
        "@handlers": './src/common/handlers',
        "@utils": './src/common/utils',
        "@client": './src/client',
        "@services": './src/common/services',
        '@interfaces': './src/common/interfaces'
      }
    }]
  ],

  ignore: ['./src/common/interfaces']
};
