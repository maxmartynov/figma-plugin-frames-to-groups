const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = (env, argv) => ({
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui/index.ts',
    index: './src/index.ts',
  },

  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },
  optimization: {
    minimize: argv.mode === 'production',
  },

  module: {
    rules: [
      // Converts Vue code to JavaScript
      {
        test: /\.vue$/,
        use: {loader: 'vue-loader'},
        exclude: /node_modules/,
      },

      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: {loader: 'ts-loader', options: {appendTsSuffixTo: [/\.vue$/]}},
        exclude: /node_modules/,
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },

      {
        test: /\.(png|jpg|gif|webp|svg)$/,
        type: 'asset/inline',
      },
    ],
  },

  resolve: {
    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    fallback: {
      fs: false,
    },
  },

  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui/index.html',
      filename: 'ui.html',
      inlineSource: '.(js|css)$',
      chunks: ['ui'],
      inject: 'body',
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new VueLoaderPlugin(),
  ],
})
