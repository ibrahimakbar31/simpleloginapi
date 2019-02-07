const Redis = require('ioredis')
const configDB = require('../../../configs/database.js').redis_master;

let dbRedis = new Redis(configDB);
module.exports = dbRedis;