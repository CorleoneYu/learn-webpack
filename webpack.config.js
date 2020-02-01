const path = require("path");
const rimraf = require("rimraf");
const Config = require("webpack-chain");
const config = new Config();
const resolve = src => {
  return path.join(process.cwd(), src);
};

rimraf.sync("dist");

config
  .entry("scr/index")
  .add(resolve("src/index.js"))
  .end()
  // 模式
  // .mode(process.env.NODE_ENV) 等价下面
  .set("mode", process.env.NODE_ENV)
  // 出口
  .output.path(resolve("dist"))
  .filename("[name].bundle.js");

config.module
  .rule("css")
  .test(/\.css$/)
  .use("css")
  .loader("css-loader");

module.exports = config.toConfig();
