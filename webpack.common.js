const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  resolve: {
    // necessary to avoid file extensions while importing files;
    // '...' means for webpack to make it possible to access the default extensions
    extensions: ['.ts', '.tsx', '.js', '.jsx', '...']
  },

  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  /*externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },*/

  plugins: [
    // copies images to `dist/static/images` folder
    new CopyPlugin({
      patterns: [
        { from: "src/static/images", to: "static/images" },
        { from: "src/.htaccess", to: "" },
      ],
    }),
    // copies './src/index.html' to `dist` folder
    new HtmlWebpackPlugin({
      title: 'Optional title in html',
      template: path.resolve(__dirname, './src/index.html'), // template
      filename: 'index.html', // output file name
    }),
  ]
};