// 首页
const { API, methods } = require('../config');
const DIR = 'default', TAGS = [API, DIR];

const routes = [
  {
    method: methods.get,
    path: '/',
    handler: (req, res) => {
      res('hapi home page.');
    },
    config: {
      tags: TAGS,
      description: 'index'
    },
  },
];

module.exports = routes;
