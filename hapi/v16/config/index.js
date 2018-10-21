// 配置文档
const Joi = require('joi');

// hapi-swagger 接口文档配置
exports.swagger = {
  options: {
    // 接口分组 /routes/* { name: DIR, description: 路由名称 }
    tags: [
      { name: 'default', description: '首页' },
      { name: 'token', description: '签发JWT-token' },
      { name: 'shops', description: '店铺' },
      { name: 'orders', description: '订单' },
    ],
  },
};

// hapi 接口框架
exports.hapiConfig = {
  connections: [
    // 接口网址: 主机名和端口号 /.env
    { labels: PKG.name, host: ENV.HOST, port: ENV.POST },
  ],
  serverOptions: {
    app: { name: PKG.name }, // 全局静态变量 > request.server.app.name
    cache: [// 缓存 > request.server.cache.get
      {
        engine: require('catbox-memory'), // require('catbox-redis'),
        name: 'default-cache', partition: 'hapi-cache', shared: false
      }
    ],
    connections: {
      compression: true, // gzip
      load: {
        maxHeapUsedBytes: 0, // 内存限制,0表示不限制
        maxRssBytes: 0,
        maxEventLoopDelay: 0
      },
      router: {
        isCaseSensitive: false, // 路由 不 区分大小写
        stripTrailingSlash: false
      },
      routes: {
        // auth: false,
      },
      // log: true,
    },
    debug: {              // 开发调试日志
      log: ['error'],     // 代码执行异常时
      request: ['error'], // 请求异常时
    },
    load: {
      // sampleInterval: 10
    },
  }
};

/** hapi 请求限制 */
exports.API = 'api';
/** 过期限制(输入秒/输出毫秒) */
exports.exp = (s) => (Date.now() + s * 1000);
exports.methods = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};
/** 请求参数验证 */
exports.validate = {
  /**
   * 分页查询: page=1&limit=10
   * @param limit 每页的条目数: 默认10
   */
  pager: (limit = 10, pagination = true) => {
    return {
      page: Joi.number().integer().min(1).default(1).description('页码数'),
      limit: Joi.number().integer().min(1).default(limit).description('每页的条目数'),
      pagination: Joi.boolean().default(pagination).description('开启分页，默认true'),
    };
  },
  /**
   * 基于 JWT 的用户身份验证
   */
  jwt: {
    headers: Joi.object({
      authorization: Joi.string().required().description('jwt token'),
    }).unknown(), // 冗余处理
  },
};
