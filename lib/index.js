const fs = require('fs');
const join = require('path').join;

/**
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  const ret = [];
  function finder(path) {
    const files = fs.readdirSync(path);
    files.forEach(val => {
      const fPath = join(path, val);
      const stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) ret.push(fPath);
    });
  }
  finder(join(__dirname, startPath));
  return ret;
}

function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    // --report => { report: true }
    const key = camelize(o.long.replace(/^--/, ''));
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  })
  return args;
}

// 转 驼峰
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}

exports.findSync = findSync
exports.cleanArgs = cleanArgs