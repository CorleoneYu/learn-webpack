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
  finder(join(process.cwd(), startPath));
  return ret;
}

exports.findSync = findSync;