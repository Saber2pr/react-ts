const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const publicPath = (resourcePath, context) =>
  path.relative(path.dirname(resourcePath), context) + '/'

const cdn = '//cdn.jsdelivr.net/gh'
const username = 'saber2pr'
const pages_branch = 'gh-pages'
const repo = 'react-ts' // github 仓库

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  entry: './src/app.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    filename: '[name].[hash].min.js',
    path: path.join(__dirname, 'build'),
    publicPath:
      process.env.NODE_ENV === 'production'
        ? `${cdn}/${username}/${repo}@${pages_branch}/`
        : '/',
  },
  /**
   * @type {webpackDevServer.Configuration}
   */
  devServer: {
    // 本地调试跨域代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          // 本地走/dev-api，线上走/api
          '^/dev-api': '/api',
        },
      },
    },
  },
  module: {
    rules: [
      // 使用babel编译js、jsx、ts、tsx
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader'],
      },
      // 图片url处理
      {
        test: /\.(woff|svg|eot|ttf|png)$/,
        use: ['url-loader'],
      },
      // css、less编译
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath },
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // index.html模板设置
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: 'style.[id][hash].css',
    }),
    // webpack编译进度
    new webpack.ProgressPlugin(),
  ],
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules|lib/,
  },
  // 代码分割
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
}
