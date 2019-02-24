/** hapi-swagger 接口文档配置 */
module.exports = {
    options: {
        // 接口分组/配置路由/目录位置:/routes/* 格式:{ name: DIR, description: 路由名称 }
        tags: [
            { name: 'default', description: '首页' },
            { name: 'token', description: '签发JWT-token' },
            { name: 'shops', description: '店铺' },
            { name: 'orders', description: '订单' },
        ]
    }
};
