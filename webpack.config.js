const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const aliases = require('./config/aliases');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/index.html",
  filename: "./index.html"
});


module.exports = function (env) {

  const nodeEnv = env.dev ? 'development' : 'production';
  const port = env.dev ? '5000' : '80';
  const host = env.dev ? 'localhost' : 'divij.net';
  const outputFileName = env.dev ? "[name].js" : "[name]-[hash].js";

  return {
    // entry: './client',
    entry: {
      vendor: [
        "babel-polyfill",
        "prop-types",
        "react",
        "react-dom",
        "react-router",
        "react-router-dom",
      ],
      // app: path.join(clientConfig.inputDirectory, "client.js"),
      app: './client/index.js',
    },
    output: {
      path: path.resolve('dist'),
      filename: outputFileName
    },
    resolve: {
      alias: aliases,
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {loader: "style-loader"},
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64:5]",
                sourceMap: true,
                minimize: true
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                modules: false,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64:5]",
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: "less-loader"
            }
          ]
        },
      ]
    },
    plugins: [htmlPlugin],
    devServer: {
      inline            : true,
      port              : port,

      // this is for react router, see https://github.com/ReactTraining/react-router/issues/676
      historyApiFallback: true,

      contentBase: '/client',
      // all /api requests are served from the api service on the node layer
      proxy: {
        "/api": {
          target: `http://localhost:3000`,
          secure: false
        },
      }
    },
  };
}
