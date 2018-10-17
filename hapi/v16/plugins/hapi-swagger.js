/**
 * 自定义hapi-swagger插件配置
 */
const inert = require('inert');
const vision = require('vision');
const packageModule = require('package');
const hapiSwagger = require('hapi-swagger');

module.exports = [
  inert,
  vision,
  {
    register: hapiSwagger,
    options: {
      info: {
        title: 'hapi-tutorial 接口文档',
        version: packageModule.version,
      },
      grouping: 'tags', // 定义接口以tags属性为分组
      tags: [
        /**
         * 此处为接口申明
         */
        { name: 'index', description: '首页' },
      ],
    },
  },
];
