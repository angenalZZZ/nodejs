const hapiPagination = require('hapi-pagination');

const options = {
  query: {
    // ... 此处篇幅考虑省略 query 入参配置代码，参看章节  github 案例
  },
  meta: {
    name: 'meta',
    // ... 此处篇幅考虑省略 meta 的相关配置代码，参看章节  github 案例
  },
  results: {
    name: 'results'
  },
  reply: {
    paginate: 'paginate'
  },
  routes: {
    include: [
      '/shops', '/shops/{id}/goods',  // 店铺列表支持分页特性
    ],
    exclude: []
  }
};

module.exports = {
  register: hapiPagination,
  options: options,
};
