const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res('hapi home page.');
    },
    config: {
      tags: ['api', 'index'],
      description: 'api首页'
    },
  },
];

module.exports = routes;
