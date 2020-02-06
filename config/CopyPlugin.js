const CopyPlugin = require('../webpack-plugin-copy');

module.exports = ({ config, options }) => {
  return () => {
    if (options.copy) {
      config.plugin('copy-dist').use(CopyPlugin, [
        {
          from: 'dist',
          to: 'dist2',
        },
      ]);
    }
  };
};
