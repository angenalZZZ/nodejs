/**
 * 自定义hapi-swagger插件配置
 */
const inert = require('inert');
const vision = require('vision');

const hapiSwagger = require('hapi-swagger');
const { swagger } = require('../config');

module.exports = [
  inert,
  vision,
  {
    register: hapiSwagger,
    options: {
      info: {
        title: PKG.description,
        version: PKG.version,
      },
      grouping: 'tags', // 定义接口以tags属性为分组
      tags: [...swagger.options.tags], // 接口分组
    },
  },
];
