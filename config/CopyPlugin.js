const CopyPlugin = require('../webpack-plugin-copy');

module.exports = ({ config }) => {
  return () => {
    config.plugin('copy-dist')
      .use(CopyPlugin, [{
        from: 'dist',
        to: 'dist2'
      }])
  }
}