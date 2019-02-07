const Promise = require('promise')
const pgMaster = require('../databases/models/pg_master/index')
const generate = require('nanoid/generate');
const config = require('../configs/global')
const jwt = require('jsonwebtoken');

function tokenLogin(userId, type = 'user') {
    return new Promise(async function (resolve, reject) {
        try {
            let loginData = null;
            let expired = 3600;
            let accessTokenData = {};
            if (type == 'user') {
                loginData = await pgMaster.users.findOne({ where: { id: userId } });
                if (!loginData) throw ('ID_INVALID');
                accessTokenData = {
                    user: {
                        id: loginData.id
                    }
                }
            } else throw ('LOGIN_TYPE_INVALID')
            let refreshToken = loginData.refresh_token;
            if (!refreshToken) {
                let refreshTokenNew = generate('1234567890abcdefghijklmnopqrstuvwxyz', 50);
                let checkRefreshToken = null;
                for (var i = 0; i < 10; i++) {
                    if (type == 'user') {
                        checkRefreshToken = await pgMaster.users.findOne({ where: { refresh_token: refreshTokenNew } })
                    }
                    if (checkRefreshToken) {
                        refreshTokenNew = generate('1234567890abcdefghijklmnopqrstuvwxyz', 50);
                    } else {
                        refreshToken = refreshTokenNew;
                        break;
                    }
                };
                if (!refreshToken) throw ('GENERATE_REFRESH_TOKEN_FAILED');
            }
            let accessToken = jwt.sign(accessTokenData, config.app.secretKey, { expiresIn: expired });
            loginData.refresh_token = refreshToken;
            await loginData.save();
            resolve({
                accessToken,
                refreshToken,
                expired,
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    tokenLogin,
    //tokenRefresh,
}