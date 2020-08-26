module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json'],
        alias: {
          '@rootConfig': ['./react/configs'],
          '@assets': ['./src/assets'],
          '@components': ['./src/components'],
          '@atoms': ['./src/components/atoms'],
          '@molecules': ['./src/components/molecules'],
          '@organisms': ['./src/components/organisms'],
          '@navigations': ['./src/navigations'],
          '@screens': ['./src/screens'],
          '@services': ['./src/services'],
          '@styles': ['./src/styles'],
          '@context': ['./src/context'],
          '@utils': ['./src/utils'],
          '@hooks': ['./src/hooks']
        }
      }
    ]
  ],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
