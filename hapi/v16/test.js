const url = require('url');

const redisURL = url.parse('user:@127.0.0.1:6379');
const  rc = {
    port: redisURL.port,
    host: redisURL.hostname,
    auth: redisURL.auth.split(":")[1]
  };
console.log(JSON.stringify(rc));

console.log(Date.now());
// console.log(new Date().getTime());
