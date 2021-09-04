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
        "@command": './src/command',
        "@event": './src/event',
        "@utils": './src/utils',
        "@services": './src/services',
        '@interfaces': './src/interfaces'
      }
    }]
  ],

  ignore: ['./src/interfaces']
};
