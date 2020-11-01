const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globalDeps = require("./package.json").dependencies;

module.exports = function ({ deps, entry, port, name, filename, appName }) {
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    entry,
    cache: false,
    mode: "development",
    devtool: "source-map",
    optimization: {
      minimize: false,
    },
    devServer: {
      contentBase: "./dist",
      hot: true,
      port,
    },
    output: {
      publicPath: `http://localhost:${port}/`,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".scss"],
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
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: isDevelopment,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name,
        library: { type: "var", name },
        filename,
        exposes: {
          [appName]: entry,
        },
        shared: {
          ...globalDeps,
          ...deps,
          react: {
            singleton: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? "[name].css" : "[name].[hash].css",
        chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
      }),
    ],
  };
};
