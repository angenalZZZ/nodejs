// 店铺
const Joi = require('joi');
const Boom = require('boom');
const { API, methods, validate } = require('../config');
const DIR = 'shops', TAGS = [API, DIR];
const models = require('../models');

const routes = [
  {
    method: methods.get,
    path: `/${DIR}`,
    handler: async (req, res) => {
      let result;
      // result = await models.shops.findAll();
      // result = await models.shops.findAll({ attributes: ['id', 'name'] });
      // result = await models.shops.findAll({ attributes: { include: ['id', 'name'], exclude: ['created_at', 'updated_at'] } });
      const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
        attributes: ['id', 'name'],
        limit: req.query.limit,
        offset: (req.query.page - 1) * req.query.limit,
      });
      // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
      result = { results, totalCount };
      res(result);
    },
    config: {
      tags: TAGS,
      description: '获取店铺列表',
      auth: false,
      validate: {
        query: {
          ...validate.pager(),
        },
      },
    },
  },
  {
    method: methods.get,
    path: `/${DIR}/{id}/goods`,
    handler: async (req, res) => {
      let result;
      const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
        attributes: ['id', 'name'],
        where: { shop_id: req.params.id },
        limit: req.query.limit,
        offset: (req.query.page - 1) * req.query.limit,
      });
      // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
      result = { results, totalCount };
      res(result);
    },
    config: {
      tags: TAGS,
      description: '获取店铺的商品列表',
      auth: false,
      validate: {
        query: {
          ...validate.pager(),
        },
        params: {
          id: Joi.number().integer().required().description('店铺id'),
        },
      },
    },
  },
];

module.exports = routes;
