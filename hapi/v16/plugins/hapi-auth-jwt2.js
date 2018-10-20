const validateFunc = (decoded, request, callback) => {
  let error = null;

  // decoded 为 JWT payload 被解码后的数据
  const { userId } = decoded;

  if (!userId) {
    return callback(error, false, userId);
  }

  // 数据库验证 userId
  // 省略了

  const credentials = {
    userId,
  };
  // 在路由接口的 handler 通过 request.auth.credentials 获取 jwt decoded 的值
  return callback(error, true, credentials);
};

module.exports = (server) => {
  server.auth.strategy('jwt', 'jwt', {
    // 需要自行在 config/index.js 中添加 jwtSecret 的配置，并且通过 process.env.JWT_SECRET 来进行 .git 版本库外的管理。
    key: ENV.JWT_SECRET,
    validateFunc: validateFunc,
  });
  server.auth.default('jwt');
};
