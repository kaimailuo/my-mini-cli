'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _dev = require('./dev');

var _dev2 = _interopRequireDefault(_dev);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//项目打包

/**
 * my-mini-cli 命令列表
 */

// 项目初始化
// 优化处理命令行
let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目', // 描述
    usages: [// 使用方法
    'my-mini-cli create ProjectName', 'mm-cli create ProjectName', 'mmc create ProjectName'],
    alias: 'c' // 命令简称
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: ['my-mini-cli init', 'mm-cli init', 'mmc init'],
    alias: 'i'
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: ['my-mini-cli dev', 'mm-cli dev', 'mmc dev'],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 3000
    }],
    alias: 'd'
  },
  //打包
  build: {
    description: '服务端项目打包',
    usages: ['my-mini-cli build', 'mm-cli build', 'mmc build'],
    alias: 'b'
  }

  // 添加create,init,dev命令
}; // 项目启动
// 项目创建
Object.keys(actionMap).forEach(action => {

  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option];
      _commander2.default.option(obj.flags, obj.description, obj.defaultValue); // 指定项目本地开发启动的端口
    });
  }

  _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    switch (action) {
      case 'create':
        (0, _create2.default)(...process.argv.slice(3));
        break;
      case 'init':
        (0, _init2.default)();
        break;
      case 'dev':
        (0, _dev2.default)(_commander2.default.port);
        break;
      case 'build':
        (0, _build2.default)();
        break;
      default:
        break;
    }
  });
});

// 项目版本
_commander2.default.version(require('../package.json').version, '-v --version').parse(process.argv);

/**
 * my-mini-cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp();
}