const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = ({ config, resolve, options }) => {
  let template = 'public/index.html',
    filename = 'index.html',
    entry = '',
    publicPath = '';

  if (options.name) {
    const name = options.name;
    filename = options.pages[name].filename;
    publicPath = options.pages[name].publicPath;
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
