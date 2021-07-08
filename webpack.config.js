// const path = require("path");
// const webpack = require("webpack");
// const PrettierPlugin = require("prettier-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

// module.exports = {
//   mode: "production",
//   devtool: "source-map",
//   entry: "./src/index.js",
//   output: {
//     filename: "index.js",
//     path: path.resolve(__dirname, "build"),
//     library: "MyLibrary",
//     libraryTarget: "umd",
//     clean: true,
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         extractComments: false,
//       }),
//     ],
//   },
//   devServer: {
//     open: true,
//     hot: true,
//     host: "localhost",
//     static: path.join(__dirname, "demo"),
//     port: 9000,
//   },
  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: "babel-loader",
  //       },
  //     },
  //     {
  //       test: /\.css$/i,
  //       use: ["style-loader", "css-loader"],
  //     },
  //     {
  //       test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
  //       use: ["url-loader"],
  //     },
  //   ],
  // },
//   plugins: [new PrettierPlugin()],
// };

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const generalConfig = {
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: ["url-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

const nodeConfig = {
  entry: './src/node.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'node.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};

const browserConfig = {
  entry: './src/browser.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true,
    library: 'ipfs-gateway-tools',
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    generalConfig.devtool = 'cheap-module-source-map';
  } else if (argv.mode === 'production') {
  } else {
    throw new Error('Specify env');
  }

  Object.assign(nodeConfig, generalConfig);
  Object.assign(browserConfig, generalConfig);

  return [nodeConfig, browserConfig];
};