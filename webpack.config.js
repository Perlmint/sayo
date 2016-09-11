var webpack_isomorphic_tools_plugin =
    new (require('webpack-isomorphic-tools/plugin'))(require('./webpack-isomorphic-tools-config'))
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/client.ts',
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
    './css/style.css'
  ],
  output: {
    path: require('path').resolve('./out/asset'),
    publicPath: '/static/',
    filename: 'client.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx']
  },
  module: {
    loaders: [
        { test: /\.tsx?$/, exclude: /^\.#/, loader: 'ts' },
        { test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css')
        },
        {
            test: /\.woff2?$/,
            loader: 'url',
            query: {
                name: 'font/[hash].[ext]',
                limit: 5000,
                mimetype: 'application/font-woff',
                prefix: '/static'
            }
        },
        {
            test: /\.(ttf|eot|svg)$/,
            loader: 'file',
            query: {
                name: 'font/[hash].[ext]',
                prefix: '/static'
            }
        },
    ]
  },
  plugins:
  [
      webpack_isomorphic_tools_plugin,
      new ExtractTextPlugin('styles.css')
  ]
}
