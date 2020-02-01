const { findSync } = require('../lib');
const Config = require('webpack-chain');
const config = new Config();
const files = findSync('config');
const path = require('path');
const resolve = p => {
  return path.join(process.cwd(), p);
}

module.exports = () => {
  // 构建出 webpack 的 config Map
  const map = new Map();

  files.map(file => {
    const name = file.split('/')
    .pop()
    .replace('.js', '');
    return map.set(name, require(file)(config, resolve));
  });

  
  map.forEach((v, key) => {
    // css 配置
    if (key === 'css') {
      v('css', /\.css$/);
    } else {
      v()
    }
  })
  
  return config
}