const Promise = require('promise')
const pgMaster = require('./databases/models/pg_master/index');
const bcrypt = require('bcrypt')

function main() {
    return new Promise(async function (resolve, reject) {
        try {
            let password = await bcrypt.hash('password', 10);
            await pgMaster.users.findOrCreate({
                where: {
                    username: 'user'
                },
                defaults: {
                    username: 'user',
                    password: password,
                    email: 'user@example.com',
                    phone: '81812345678',
                    fullname: 'ibrahim akbar',
                    country_id: 'ID',
                }
            });

            await pgMaster.error_code.findOrCreate({
                where: {
                    id: 'AUTH_FAILED'
                },
                defaults: {
                    id: 'AUTH_FAILED',
                    code: 11,
                    message: 'wrong id and password combination',
                    description: 'wrong login credential. Please input valid id and password combination',
                    status: 401,
                    type: 'authorization',
                }
            });

            await pgMaster.error_code.findOrCreate({
                where: {
                    id: 'UNAUTHORIZED'
                },
                defaults: {
                    id: 'UNAUTHORIZED',
                    code: 12,
                    message: 'wrong API access parameter or token expired',
                    description: 'wrong API access parameter or token expired. Please get new access_token with refresh_token or relogin',
                    status: 401,
                    type: 'authorization',
                }
            });

            await pgMaster.error_code.findOrCreate({
                where: {
                    id: 'INPUT_ID_REQUIRED'
                },
                defaults: {
                    id: 'INPUT_ID_REQUIRED',
                    code: 101,
                    message: 'input id required',
                    description: 'Please input id parameter',
                    status: 401,
                    type: 'input_validation',
                }
            });

            await pgMaster.error_code.findOrCreate({
                where: {
                    id: 'INPUT_PASSWORD_REQUIRED'
                },
                defaults: {
                    id: 'INPUT_PASSWORD_REQUIRED',
                    code: 102,
                    message: 'input password required',
                    description: 'Please input password parameter',
                    status: 401,
                    type: 'input_validation',
                }
            });

            resolve('DONE')
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = main