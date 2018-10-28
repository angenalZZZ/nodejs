// JWT认证授权(先调用/token获取认证)
const auth = ENV.AUTH_JWT;
/** 授权网关 */
const validate = (decoded, request, callback) => {
  // decoded 为 JWT payload 被解码后的数据
  // console.log('decoded:', decoded);
  if (!decoded || !decoded.id) return callback(null, false, null);
  // 通过认证 credentials session data
  const redisChecked = request.redis.get(decoded.id, function (err, data) {
    // console.log(`redis.get:${decoded.id}`, data);
    if (err || !data) return callback(err, false, null);
    // 在路由接口的 handler 可以通过 request.auth.credentials 获取缓存的 session data
    try {
      const session = JSON.parse(data);
      // 验证通过 => 授权访问
      const valid = (session.valid == undefined || session.valid == true);
      return callback(null, valid, session);
    } catch (e) {
      return callback(e, false, null);
    }
  });
  if (!redisChecked) return callback(null, false, null);
};
/** 注册认证授权 */
exports.register = (server, options, next) => {
  server.auth.strategy(auth, auth, {
    key: ENV.JWT_SECRET,               // 私钥 JWT_SECRET 要在版本库外管理
    validateFunc: validate,            // 授权网关
    verifyOptions: {
      ignoreExpiration: true,          // 忽略过期
      algorithms: [ENV.JWT_algorithms] // 算法-默认为HS256
    }
  });
  server.auth.default(auth);           // 认证授权-默认为jwt
  next();
};
exports.register.attributes = { name: 'plugins:hapi-auth-jwt2' };
