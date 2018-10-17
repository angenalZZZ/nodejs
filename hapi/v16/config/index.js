// 获取进程相关的系统配置
const { env } = process;

module.exports = {
  host: env.HOST,
  port: env.POST,
};
