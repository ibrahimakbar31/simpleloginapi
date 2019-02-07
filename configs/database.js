const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
var config = null;

let jsonText = fs.readFileSync('./database_configuration.json', 'utf8')
jsonText = JSON.parse(jsonText);
config = jsonText[env];

module.exports = config;