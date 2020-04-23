const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: './dist/index.js',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: './',
    filename: 'frontend.bundle.js',
    path: path.resolve(__dirname, 'bundle'),
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
    symlinks: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body',
    }),
  ],
};
