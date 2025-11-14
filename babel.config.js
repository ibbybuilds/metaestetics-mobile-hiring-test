module.exports = function(api) {
  api.cache(true);
  const isJest = process.env.JEST_WORKER_ID !== undefined;
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
            '@services': './src/services',
            '@utils': './src/utils',
            '@types': './src/types',
            '@theme': './src/theme'
          }
        }
      ],
      // Only include reanimated plugin if not running in Jest
      ...(!isJest ? ['react-native-reanimated/plugin'] : [])
    ]
  };
};

