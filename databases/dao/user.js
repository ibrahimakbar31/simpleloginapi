const pgMaster = require('../models/pg_master/index')
const Promise = require('promise')
//const moment = require('moment')
const { countries } = require('countries-list')
const client = require('../models/redis_master/index')

class User {

    constructor() {
    }
    
    getByUsername(username) {
        return new Promise(async function (resolve, reject) {
            try {
                let output = null;
                let data = await pgMaster.users.findOne({ where: { username: username }, raw: true });
                if (data) {
                    output = data;
                    output.country = {};
                    output.country.id = data.country_id;
                    delete output.country_id;
                }
                resolve(output);
            } catch (err) {
                reject(err);
            }
        });
    }

    getByEmail(email) {
        return new Promise(async function (resolve, reject) {
            try {
                let output = null;
                let data = await pgMaster.users.findOne({ where: { email: email }, raw: true });
                if (data) {
                    output = data;
                    output.country = {};
                    output.country.id = data.country_id;
                    delete output.country_id;
                }
                resolve(output);
            } catch (err) {
                reject(err);
            }
        });
    }

    getById(userId) {
        return new Promise(async function (resolve, reject) {
            try {
                let output = null;
                let dataRedis = await client.get('user:' + userId);
                if (!dataRedis) {
                    //console.log('data from pg')
                    let dataPg = await pgMaster.users.findByPk(userId, { raw: true });
                    if (dataPg) {
                        output = dataPg;
                        let addRedis = await client.set('user:' + userId, JSON.stringify(data), 'EX', 300);
                    }
                } else {
                    //console.log('data from pg')
                    output = JSON.parse(dataRedis);
                }
                if (output) {
                    output.country = {};
                    output.country.id = output.country_id;
                    output.country.name = countries['ID'].name;
                    delete output.country_id;
                    delete output.created_at;
                    delete output.updated_at;
                    output.phone = countries['ID'].phone + output.phone;
                }
                resolve(output);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = User