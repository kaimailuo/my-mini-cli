import program from 'commander'; // 优化处理命令行
import symbol from 'log-symbols';
import chalk from 'chalk';

import create from './create'; // 项目创建
import init from './init'; // 项目初始化
import dev from './dev'; // 项目启动
import build from './build'; //项目打包

/**
 * my-mini-cli 命令列表
 */

let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目', // 描述
    usages: [ // 使用方法
      'my-mini-cli create ProjectName',
      'mm-cli create ProjectName',
      'mmc create ProjectName'
    ],
    alias: 'c' // 命令简称
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: [
      'my-mini-cli init', 'mm-cli init', 'mmc init'
    ],
    alias: 'i'
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: [
      'my-mini-cli dev', 'mm-cli dev', 'mmc dev'
    ],
    options: [
      {
        flags: '-p --port <port>',
        description: '端口',
        defaultValue: 3000
      }
    ],
    alias: 'd'
  },
  //打包
  build: {
    description: '服务端项目打包',
    usages: [
      'my-mini-cli build', 'mm-cli build', 'mmc build'
    ],
    alias: 'b'
  }
}

// 添加create,init,dev命令
Object
  .keys(actionMap)
  .forEach(action => {

    if (actionMap[action].options) {
      Object
        .keys(actionMap[action].options)
        .forEach(option => {
          let obj = actionMap[action].options[option];
          program.option(obj.flags, obj.description, obj.defaultValue); // 指定项目本地开发启动的端口
        })
    }

    program
      .command(action)
      .description(actionMap[action].description)
      .alias(actionMap[action].alias)
      .action(() => {
        switch (action) {
          case 'create':
            create(...process.argv.slice(3));
            break;
          case 'init':
            init();
            break;
          case 'dev':
            dev(program.port);
            break;
          case 'build':
            build();
            break;
          default:
            break;
        }
      })
  });

// 项目版本
program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv);

/**
 * my-mini-cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
