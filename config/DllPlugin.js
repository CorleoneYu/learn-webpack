const webpack = require('webpack');

module.exports = ({ config, options, resolve }) => {
  return () => {
    if (options.dll) {
      config.plugin('DllPlugin').use(webpack.DllReferencePlugin, [
        {
          context: process.cwd(),
          manifest: require(resolve('dll/manifest.json')),
        },
      ])
    }
  }
}
