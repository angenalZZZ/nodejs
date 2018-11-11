// JWT认证(调用/token获取认证)：用 jsonwebtoken 签发 JWT token
const Joi = require('joi');
const Boom = require('boom');
const { API, exp, methods, validate } = require('../config');
const DIR = 'token', TAGS = [API, DIR];
const JWT = require('jsonwebtoken');
const aguid = require('aguid'); // https://github.com/ideaq/aguid

/** 认证账号 */
const checkUserInfo = (user) => {
  let username = user.split(':')[0], password = user.split(':')[1];
  // 通过查询数据库 进行验证
  let valid = (username == password);
  let userInfo = { user: { name: username } };
  return valid ? userInfo : null;
};

/** 认证用户(客户端)有效 */
const authFunc = (req) => {
  // 客户端 请求参数需 base64解码: btoa("Hello") > "SGVsbG8=" , atob("SGVsbG8=") > "Hello"
  let user = req.payload.user || req.headers.authorization;
  if (!user || !(user = user.split(' ').pop())) {
    return Boom.badRequest('用户信息不能为空');
  }
  // 客户端 Authorization : Basic ***  =>  btoa(Username:Password) => decoded
  let encoded = user, decoded = user;
  if (encoded.substr(encoded.length - 1) == '=') decoded = Buffer.from(encoded, 'base64').toString();
  // 认证账号
  let userInfo = checkUserInfo(decoded);
  if (!userInfo) {
    return Boom.badRequest('用户信息无效');
  }
  // 通过认证 credentials session 这里存储用户的基本信息
  const session = {
    id: aguid(), // a random session id
    nbf: exp(), // time: now
    exp: ENV.JWT_LIFETIME, // time: exp seconds
    valid: true, // 可选参数: 是否有效? 用于加强授权管理
    ...userInfo
  };
  // 缓存 session key => session json data; EX: 过期时间; NX: 不存在key时才能创建缓存(可选参数)
  req.redis.set(`session-key-${session.id}`, JSON.stringify(session), 'EX', session.exp);
  session.iat = session.nbf;
  return session;
};

/** 实现 签发 JWT = 生成给客户端调用的 token */
const generateJWT = (session) => {
  const payload = { // 不要在 payload 中存放诸如密码密秘类的安全敏感数据
    id: session.id, // 会话标识session.id
    iat: session.iat, // (issuedAt) now 签发时间
    exp: exp(session.exp), // (expiresIn)
    nbf: session.nbf, // (notBefore)
  };
  const options = {
    algorithm: ENV.JWT_algorithms,
    expiresIn: payload.exp, // 过期时间ms-毫秒, 或字符标识-秒: 60, "2 days", "10h", "7d"
    notBefore: payload.nbf, // 什么时间之前，该 JWT 都是不可用的
    // audience: '', // 接收 JWT 的一方
    // subject: '', // 面向的用户
    // issuer: '', // 签发者
    // jwtid: aguid(), // JWT 的唯一身份标识，主要用来作为一次性 token，从而避免重放攻击
    // noTimestamp: true,
    // header: {},
    // encoding: ''
  };
  // JWT_SECRET 要在版本库外管理: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  return JWT.sign(payload, ENV.JWT_SECRET, options);
};
/** default cookie options */
const default_cookie_options = {
  encoding: 'none',    // we already used JWT to encode
  isSecure: false,     // warm & fuzzy feelings
  isHttpOnly: true,    // prevent client alteration
  clearInvalid: false, // remove invalid cookies
  strictHeader: true,  // don't allow violations of RFC 6265
  path: '/'            // set the cookie for all routes
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
        // 输出 token
        const token = generateJWT(session);
        // 输出 auth cookie https://github.com/dwyl/hapi-auth-jwt2-cookie-example
        if (req.payload.cookie) {
          const cookie_options = {
            ttl: session.exp * 1000, // 过期毫秒
            ...default_cookie_options
          };
          res().header('Authorization', `Bearer ${token}`)
            .state(req.payload.cookie, token, cookie_options);
        } else {
          res().header('Authorization', `Bearer ${token}`);
        }
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
          cookie: Joi.string().default('token').description('auth-cookie')
        },
      },
    },
  },
  {
    method: methods.delete,
    path: `/${DIR}`,
    handler: async (req, res) => {
      const { id } = req.auth.credentials;
      const redisChecked = req.redis.get(id, function (err, session) {
        if (err) return res(Boom.boomify(err));
        // 设置 session 过期
        session = JSON.parse(session);
        session.valid = false;
        // 删除缓存 session data
        // req.redis.del(`session-key-${session.id}`);
        // 修改缓存 session data
        req.redis.set(`session-key-${session.id}`, JSON.stringify(session));
        // 删除 auth cookie
        if (req.payload.cookie) {
          const cookie_options = {
            ttl: 1, ...default_cookie_options
          };
          res().state(req.payload.cookie, '', cookie_options);
        } else {
          res();
        }
      });
      if (!redisChecked) res(Boom.unauthorized('unchecked'));
    },
    config: {
      tags: TAGS,
      description: '删除token',
      // auth: false,
      validate: {
        ...validate.jwt,
        payload: {
          cookie: Joi.string().default('token').description('auth-cookie')
        }
      }
    }
  }
];