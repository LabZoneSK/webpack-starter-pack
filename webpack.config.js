const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: 'multi-entry-loader!',
  entry:  [
    './src/js/index.js', 
    './src/scss/style.scss',
    'multi-entry-loader?include=./src/*.html!',
    'multi-entry-loader?include=./src/images/**.*!'
  ],
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'build/')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '/css/style.css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader', 
            options: { 
              url: false, 
            } 
          },
          { 
            loader: 'sass-loader', 
            options: { 
              outputStyle: "compressed"
            } 
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: "extract-loader",
            options: {
              publicPath: "../",
            }
          },
          {
            loader: "html-loader",
            options: {
              minimize: true,
              attrs: false,
              removeComments: true,
              collapseWhitespace: true,
            },
          },
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
    ]
  },
};