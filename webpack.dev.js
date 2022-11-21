const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    watchFiles: ['./src/index.html'],
    liveReload: true,
    open: true,
    client: {
      logging: 'warn',
      reconnect: 2,
    },
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
