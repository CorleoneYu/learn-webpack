module.exports = ({ config }) => {
  return () => {
    // 提取公用库
    config.optimization.splitChunks({
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 3,
      maxInitialRequests: 3,
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial"
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true
        }
      }
    });

    // tree-shaking
    config.optimization.usedExports(true);
  };
};
