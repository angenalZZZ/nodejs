// 环境配置文档
global.ENV = process.env;
global.PKG = require('./package.json');
ENV.PROD = (process.env.NODE_ENV === 'production');
require('env2')(ENV.PROD ? './.env.prod' : './.env');
const config = require('./config');
// 接口框架 https://github.com/hapijs/hapi/blob/v16/API.md
const Hapi = require('hapi');
// 接口路由
const routes = require('./utils/files').load('./routes');
// 接口实例
const server = new Hapi.Server(config.hapiConfig.serverOptions);
// 接口网址
config.hapiConfig.connections.forEach(o => server.connection(o));
// 接口插件
const plugHapiSwagger = require('./plugins/hapi-swagger');
const plugHapiError = require('hapi-error');
const plugHapiRedisConnection = require('hapi-redis-connection');
// const redis = require('redis'); // https://github.com/docdis/learn-redis https://github.com/dwyl/learn-redis
const plugHapiPagination = require('./plugins/hapi-pagination');
const hapiAuthJWT = require('hapi-auth-jwt2'); // https://github.com/dwyl/hapi-auth-jwt2
const pluginAuthJWT = require('./plugins/hapi-auth-jwt2');
// 接口服务
const startHapi = async () => {
  // 配置插件
  await server.register([
    ...plugHapiSwagger, // 接口文档
    plugHapiError, // 异常捕获
    plugHapiRedisConnection, // 缓存 redis connection > request.redis.get
    plugHapiPagination, // 分页插件
    hapiAuthJWT, pluginAuthJWT, // JWT认证授权(先调用/token获取认证)
  ], err => {
    if (err) throw err; // 插件异常
    // server.views();  // 页面视图
    // 配置路由
    server.route([...routes]);
    // 启动服务
    server.start(err => {
      if (err) throw err; // 启动异常
      config.hapiConfig.connections.forEach(o => {
        const s = server.select(o.labels);
        console.log(` [pid]  [uri]                                 [connections]`);
        console.log(`  ${s.info.id.split(':')[1]}   ${s.info.uri}/documentation     ${s.connections.length}`);
      });
    });
  });
};
startHapi();
