// 用 jsonwebtoken 签发 JWT token
const Joi = require('joi');
const { API, methods, validate } = require('../config');
const DIR = 'token', TAGS = [API, DIR];
const JWT = require('jsonwebtoken');

const routes = [
  {
    method: methods.post,
    path: `/${DIR}`,
    handler: async (req, res) => {
      const generateJWT = (jwtInfo) => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
        };
        return JWT.sign(payload, ENV.JWT_SECRET);
      };
      res(generateJWT({
        userId: req.payload.userId,
      }));
    },
    config: {
      tags: TAGS,
      description: '创建token',
      auth: false,
      validate: {
        payload: {
          userId: Joi.string().required().description('用户id'),
        },
      },
    },
  },
];

module.exports = routes;
