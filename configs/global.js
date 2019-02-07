let config = module.exports = {};
const env = process.env.NODE_ENV || 'development';

config.app = {};
config.apiURL = {};

config.hostname = 'https://api.xl.co.id';
config.app.secretKey = 'S1mpLeLog1nAPI';
config.apiURL.v1 = config.hostname + '/v1';
