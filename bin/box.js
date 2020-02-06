#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const packageConfig = require('../package.json');
const { cleanArgs } = require('../lib');
const path = require('path');
const __name__ = `build,dev,dll`;
process.env.NODE_ENV = 'none';

let boxConf = {};
let lock = false;

try {
  boxConf = require(path.join(process.cwd(), 'box.config.js'))();
} catch (error) {
  console.log('boxConf', error);
}

program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .command('build [app-page]')
  .description(`构建生产环境`)
  .option('-r, --report', '打包分析报告')
  .option('-d, --dll', '合并拆分包')
  .action(async (name, cmd) => {
    const options = cleanArgs(cmd);
    const args = Object.assign(options, { name }, boxConf);

    if (lock) return;
    lock = true;

    process.env.NODE_ENV = 'production';
    if (!name && boxConf.pages) {
      args.clear = true;
      Object.keys(boxConf.pages).forEach((page) => {
        args.name = page;
        require('../build/build')(args);
      });
    } else {
      require('../build/build')(args);
    }
  });

program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .command('dev [app-page]')
  .description(`构建开发环境`)
  .option('-d, --dll', '合并拆分包')
  .action(async (name, cmd) => {
    process.env.NODE_ENV = 'development'
    const options = cleanArgs(cmd);
    const args = Object.assign(options, { name }, boxConf);
    if (lock) return;
    lock = true;
    require('../build/dev')(args);
  });

program
  .usage('<command> [options]')
  .version(packageConfig.version)
  .command('dll [app-page]')
  .description(`编译拆分包`)
  .action(async (name, cmd) => {
    const options = cleanArgs(cmd);
    const args = Object.assign(options, { name }, boxConf);
    if (lock) return;
    lock = true;

    require('../build/dll')(args);
  });

program.parse(process.argv).args && program.parse(process.argv).args[0];

program.commands.forEach((c) => c.on('--help', () => console.log('--help')));

// process.argv[0]是可执行文件(节点)，process.argv[1]为脚本。
if (process.argv[2] && !__name__.includes(process.argv[2])) {
  console.log();
  console.log(chalk.red(`  没有找到 ${process.argv[2]} 命令`));
  console.log();
  program.help();
}

if (!process.argv[2]) {
  program.help();
}
