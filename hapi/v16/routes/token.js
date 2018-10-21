// JWT认证(调用/token获取认证)：用 jsonwebtoken 签发 JWT token
const Joi = require('joi');
const Boom = require('boom');
const { API, exp, methods } = require('../config');
const DIR = 'token', TAGS = [API, DIR];
const JWT = require('jsonwebtoken');
const aguid = require('aguid'); // https://github.com/ideaq/aguid

// 认证用户
const authFunc = (req) => {
  // 客户端 请求参数需 base64解码: btoa("Hello") > "SGVsbG8=" , atob("SGVsbG8=") > "Hello"
  let user = req.payload.user || req.headers.authorization;
  if (!user || !(user = user.split(' ').pop())) {
    return Boom.badRequest('用户信息不能为空');
  }
  let encoded = user, decoded = user;
  if (encoded.substr(encoded.length - 1) == '=') decoded = Buffer.from(encoded, 'base64').toString();
  // 客户端 Authorization : Basic ***  =>  btoa(Username:Password) => decoded
  let username = decoded.split(':')[0], password = decoded.split(':')[1];
  if (username != password) {
    return Boom.badRequest('用户信息不正确');
  }
  // 通过认证 credentials session 这里存储用户的基本信息
  const session = {
    id: aguid(), // a random session id
    username: username,
    exp: ENV.JWT_LIFETIME,
  };
  // 缓存 session data
  req.redis.set(session.id, JSON.stringify(session), 'EX', session.exp);
  return session;
};

// 实现 签发 JWT token
const generateJWT = (session) => {
  const payload = {
    id: session.id,
    exp: exp(session.exp),
  };
  // JWT_SECRET 要在版本库外管理: node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
  return JWT.sign(payload, ENV.JWT_SECRET, { algorithm: ENV.JWT_algorithms });
};

module.exports = [
  {
    method: methods.post,
    path: `/${DIR}`,
    handler: async (req, res) => {
      const session = authFunc(req);
      if (session instanceof Error) {
        res(session);
      } else {
        const token = generateJWT(session);
        res(token);
      }
    },
    config: {
      tags: TAGS,
      description: '创建token',
      auth: false,
      validate: {
        headers: Joi.object({
          authorization: Joi.string().description('用户信息base64'),
        }).unknown(),
        payload: {
          user: Joi.string().description('用户信息base64'),
        },
      },
    },
  },
];