'use strict';

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let create = async ProjectName => {

  // 项目名不能为空
  if (ProjectName === undefined) {
    console.log(_logSymbols2.default.error, _chalk2.default.red('创建项目的时候，请输入项目名'));
  } else {
    // 如果文件名不存在则继续执行,否则退出
    (0, _util.notExistFold)(ProjectName).then(() => {

      // 用户询问交互
      (0, _util.prompt)().then(answer => {

        if (answer.frame === 'react') {
          console.log(_logSymbols2.default.warning, _chalk2.default.yellow('react模板还在路上，莫急莫急~'));
          process.exit(1);
        }

        /**
         * 根据用户输入的配置信息下载模版&更新模版配置
         * 下载模版比较耗时,这里通过ora插入下载loading, 提示用户正在下载模版
        */
        let loading = (0, _ora2.default)('模板下载中...');
        loading.start('模板下载中...');

        let Api = '';
        switch (answer.frame) {
          case 'vue':
            Api = 'direct:https://github.com/kaimailuo/vue-template.git';
            break;
          case 'react':
            Api = 'direct:https://github.com/kaimailuo/react-template.git';
            break;
          default:
            break;
        }

        (0, _util.downloadTemplate)(ProjectName, Api).then(() => {

          loading.succeed('模板下载完成');

          // 下载完成后,根据用户输入更新配置文件
          const fileName = `${ProjectName}/package.json`;
          answer.name = ProjectName;
          (0, _util.updateJsonFile)(fileName, answer).then(() => {
            console.log(_logSymbols2.default.success, _chalk2.default.green('配置文件更新完的。'));
          });
        }, () => {
          loading.fail('模板下载失败');
        });
      });
    });
  }
};

module.exports = create;