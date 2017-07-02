const webpack = require('webpack');

module.exports = {
  context: __dirname,

  target: 'node',

  entry: {
    index: './src/index.js',
  },

  output: {
    path: __dirname,
    filename: 'bundle.js',
    library: 'createExtension',
    libraryTarget: 'commonjs',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
