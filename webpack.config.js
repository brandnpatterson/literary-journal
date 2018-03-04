const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: 'env'
    }
  }],
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins () {
      return autoprefixer({
        browsers: 'last 3 versions'
      });
    }
  }
};

const styles = {
  test: /\.(scss)$/,
  // here we pass the options as query params b/c it's short.
  // remember above we used an object for each loader instead of just a string?
  // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

const config = {
  entry: {
    App: './src/js/index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  // Webpack sees everthing as modules and how different loaders are responsible for different file types? Here is is where we implement them. Pass it the rules for our JS and our styles
  module: {
    rules: [javascript, styles]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    uglify,
    new BrowserSyncPlugin({
      host: 'localhost',
      proxy: 'localhost:7777',
      port: 3000,
      notify: false
    },
    {
      injectCss: true
    })
  ]
};
process.noDeprecation = true;
module.exports = config;
