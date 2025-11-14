module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@utils': './src/utils',
            '@types': './src/types',
            '@theme': './src/theme'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
