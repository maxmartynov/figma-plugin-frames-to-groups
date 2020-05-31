const path = require('path')

module.exports = (env, argv) => ({
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    index: './src/index.ts',
  },

  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  optimization: {
    minimize: argv.mode === 'production'
  },

  module: {
    rules: [

      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
        exclude: /node_modules/
      }
    ],
  },

  resolve: {
    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
});
