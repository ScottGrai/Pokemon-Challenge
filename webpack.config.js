const path = require("path");

module.exports = [
  {
    entry: "./evolutionChain.ts",
    output: {
      path: path.resolve(__dirname),
      filename: "bundle.js",
      libraryTarget: "this"
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: [
            /node_modules/,
            /test\.tsx?$/
          ]
        }
      ]
    },
    resolve: {
      extensions: ["tsx", ".ts", ".js"]
    },
    target: "node",
    devtool: "source-map"
  }
];
