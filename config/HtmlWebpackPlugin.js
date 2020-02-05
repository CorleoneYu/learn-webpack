const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('html').use(HtmlWebpackPlugin, [
      {
        template: 'public/index.html',
      },
    ])

    config.plugin('addAssetHtmlPlugin').use(AddAssetHtmlWebpackPlugin, [
      {
        filepath: resolve('dll/dll.js'),
      },
    ])
  }
}
