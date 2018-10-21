// JWT认证授权(先调用/token获取认证)
const auth = ENV.AUTH_JWT;
const validate = (decoded, request, callback) => {
  // decoded 为 JWT payload 被解码后的数据
  // console.log('decoded:', decoded);
  const { id } = decoded;
  // 验证
  if (!id) return callback(null, false, null);
  // 通过认证 credentials session
  const chk = request.redis.get(id, function (err, data) {
    if (err) return callback(err, false, data);
    // console.log(`redis.get:${id}`, data);
    // 在路由接口的 handler 通过 request.auth.credentials 获取缓存的 data
    const credentials = JSON.parse(data) || data;
    return callback(null, true, credentials);
  });
  if (!chk) return callback(null, false, null);
};

exports.register = (server, options, next) => {
  server.auth.strategy(auth, auth, {
    // JWT_SECRET 要在版本库外管理
    key: ENV.JWT_SECRET,
    validateFunc: validate,
    verifyOptions: {
      ignoreExpiration: true, // 忽略过期
      algorithms: [ENV.JWT_algorithms]
    }
  });
  server.auth.default(auth);
  next();
};
exports.register.attributes = { name: PKG.name };
