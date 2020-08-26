module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native-localize|@react-native-gesture-handler)'
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFiles: [
    './jestSetup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  setupFilesAfterEnv: ['./setup-test.js']
};
