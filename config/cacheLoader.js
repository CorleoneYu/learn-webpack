module.exports = (config, resolve) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/)
  return () => {
    baseRule.exclude
      .add((filePath) => {
        return /node_modules/.test(filePath)
      })
      .end()
      .use('cache-loader')
      .loader('cache-loader')
      .options({
        // 缓存位置
        cacheDirectory: resolve('.cache'),
      })
      .end()
  }
}
