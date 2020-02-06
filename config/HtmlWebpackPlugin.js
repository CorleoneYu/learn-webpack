const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');

module.exports = ({ config, resolve, options }) => {
  let template = path.join(__dirname, '..', 'public/index.html'),
    publicPath = options.publicPath || '/',
    filename =  options.filename || 'index.html';

  if (options.name) {
    const name = options.name;
    entry = options.pages[name].template;
    filename = options.pages[name].filename;
    publicPath = options.pages[name].publicPath;
    template = options.pages[name].template;
  }

  return () => {
    config.plugin('html').use(HtmlWebpackPlugin, [
      {
        template,
        filename,
        publicPath,
      },
    ]);

    if (options.dll) {
      config.plugin('addAssetHtmlPlugin').use(AddAssetHtmlWebpackPlugin, [
        {
          filepath: resolve('dll/dll.js'),
        },
      ]);
    }
  };
};
