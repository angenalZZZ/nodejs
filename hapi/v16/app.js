// 系统配置
require('env2')('./.env');
const config = require('./config');
// 接口框架 https://github.com/hapijs/hapi/blob/v16/API.md
const Hapi = require('hapi');
// 接口路由 route
const routesIndex = require('./routes/index-hapi');
// 接口插件 接口文档 自定义hapi-swagger插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');


// 接口服务实例
const server = new Hapi.Server({
  app: { name : 'hapi' }, // 全局静态变量 request.server.app.name
  cache: require('catbox-memory'), // require('catbox-redis'), // 缓存
  connections: {
    compression: true, // gzip
    load: {
      maxHeapUsedBytes: 0, // 内存限制
      maxRssBytes: 0,
      maxEventLoopDelay: 0
    },
    router: {
      isCaseSensitive: false, // 区分大小写
      stripTrailingSlash: false
    },
  },
  debug: {
    log: ['error'],
    request: ['error'],
  },
  load: {
    sampleInterval: 10
  }
});
// 服务网址,可以添加多个 server.connection
server.connection({ labels: 'v16', host: config.host, port: config.port });

const start = async () => {
  // 接口插件配置
  await server.register([
    ...pluginHapiSwagger, // 挂载 swagger 插件 用于 接口文档
  ]);
  // 接口路由配置
  server.route([
    ...routesIndex,
  ]);
  // 启动服务
  await server.start();
  const v16 = server.select('v16');
  console.log(` [pid]  [uri]                                [connections]`);
  console.log(`  ${v16.info.id.split(':')[1]}   ${v16.info.uri}/documentation      ${v16.connections.length}`);
};
start();
