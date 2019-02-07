const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const configDB = require('../../../configs/database.js').pg_master;
let db = {};

let sequelize = new Sequelize(configDB.database, configDB.username, configDB.password, {
    host: configDB.host,
    dialect: configDB.dialect,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        useUTC: false //for reading from database
    },
    //timezone: configGlobal.app.timezone, //for writing to database
    logging: false,
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;