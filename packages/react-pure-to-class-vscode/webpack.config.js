const webpack = require('webpack');

module.exports = {
  mode: 'production',

  context: __dirname,

  target: 'node',

  entry: {
    index: './init.js',
  },

  output: {
    path: __dirname,
    filename: '__bundle.js',
    library: 'init',
    libraryTarget: 'commonjs',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  stats: 'none',
};
