// 首页
const Boom = require('boom');
const { API, methods } = require('../config');
const DIR = 'default', TAGS = [API, DIR];

const routes = [
  {
    method: methods.get,
    config: {
      tags: TAGS,
      description: 'index',
      auth: false,
    },
    path: '/',
    handler: (req, res) => {
      res('hapi home page.');
    }
  },
];

module.exports = routes;
