const path =require('path')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    popup: './src/popup.ts',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname,  './dist'),
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-source-map', // chrome extension不支持eval方法，默认开发环境下webpack打包的是eval形式
  module: {
    rules: [
      {
        test: /.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript']
          },
        }
      }
    ],
  },
  resolve: {
    extensions: [".js",".ts"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public' },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
}