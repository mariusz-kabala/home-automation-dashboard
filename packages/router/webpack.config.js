const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      buffer: 'buffer',
      url: 'url',
      process: 'process/browser.js',
      net: path.resolve(path.join(__dirname, 'mocks/empty')),
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js',
    }),
    new ModuleFederationPlugin({
      name: "router",
      library: { type: "var", name: "router" },
      filename: "main.js",
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        "react-redux": {
          singleton: true,
          eager: true,
        },
        thunk: {
          singleton: true,
          eager: true,
        },
        redux: {
          singleton: true,
          eager: true,
        },
        buffer: {
          singleton: true,
          eager: true,
          requiredVersion: deps.buffer,
        },
        url: {
          singleton: true,
          eager: true,
          requiredVersion: deps.buffer,
        },
        mqtt: {
          singleton: true,
          eager: true,
          requiredVersion: deps.mqtt,
        },
      },
      remotes: {
        lights: "lights_remote",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
