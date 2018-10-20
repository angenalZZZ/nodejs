// 配置文档
const PROD = (process.env.NODE_ENV === 'production'); // 生产环境
require('env2')(PROD ? './.env.prod' : './.env');
global.ENV = process.env;
ENV.PROD = PROD;
global.PKG = require('package')(module);
const config = require('./config');
// 接口框架 https://github.com/hapijs/hapi/blob/v16/API.md
const Hapi = require('hapi');
// 接口路由
var routes = require("glob").sync('./routes/*.js').reduce(function (a, f) { var m = require(f); if (m instanceof Array) m.forEach(o => a.push(o)); return a; }, []);
// 接口实例
const server = new Hapi.Server(config.hapiConfig.serverOptions);
// 接口网址
config.hapiConfig.connections.forEach(o => server.connection(o));
// 接口插件
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
// 接口服务
const startHapi = async () => {
  // 配置插件
  await server.register([
    ...pluginHapiSwagger, // 接口文档
    pluginHapiPagination, // 分页
    hapiAuthJWT2,         // JWT-token
  ]);
  pluginHapiAuthJWT2(server);
  // 配置路由
  server.route([
    ...routes,
  ]);
  // 启动服务
  await server.start();
  config.hapiConfig.connections.forEach(o => {
    const s = server.select(o.labels);
    console.log(` [pid]  [uri]                                [connections]`);
    console.log(`  ${s.info.id.split(':')[1]}   ${s.info.uri}/documentation    ${s.connections.length}`);
  });
};
startHapi();
