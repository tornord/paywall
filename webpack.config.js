/* eslint-disable @typescript-eslint/no-var-requires */
// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

class WebpackHtmlScriptAttributesPlugin {
  constructor(options) {
    const defaultOptions = {};
    this.options = Object.assign({}, defaultOptions, options);
  }

  apply(compiler) {
    var self = this;
    if (compiler.hooks) {
      compiler.hooks.compilation.tap("HtmlWebpackReplace", function (compilation) {
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync("HtmlWebpackReplace", self.innerScript.bind(self));
      });
    } else {
      compiler.plugin("compilation", (compilation) => {
        compilation.plugin("html-webpack-plugin-alter-asset-tags", self.innerScript.bind(self));
      });
    }
  }

  innerScript(htmlPluginData, callback) {
    ["head", "body"].map((position) => {
      for (var i = 0; i < htmlPluginData[position].length; i++) {
        for (var key in this.options) {
          if (htmlPluginData[position][i].attributes.type === "text/javascript") {
            htmlPluginData[position][i].attributes[key] = this.options[key];
          }
        }
      }
    });
    callback(null, htmlPluginData);
  }
}

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index-bundle.tsx"),
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(txt|csv)$/i,
        use: "raw-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/checkout.html",
    }),
    // new WebpackHtmlScriptAttributesPlugin(),
    // new webpack.DefinePlugin({
    //   // <-- key to reducing React's size
    //   "process.env": { NODE_ENV: JSON.stringify("production") },
    // }),
    // new CompressionPlugin({
    //   algorithm: "gzip",
    //   test: /\.js$/,
    //   compressionOptions: { level: 1 },
    //   threshold: 8192,
    // }),
  ],
  output: {
    path: path.resolve("paywallserver"),
    filename: "paywall.js",
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "paywallserver"),
    compress: true,
    port: 3000,
  },
  optimization: {},
};
