const Promise = require('promise')
const pgMaster = require('../databases/models/pg_master/index')
const config = require('../configs/global')

function errorOutput(errorData) {
    return new Promise(async function (resolve, reject) {
        try {
            let linkDocs = config.hostname + '/error/code/';
            let status = 500;
            let code = 0;
            let type = 'unknown_error';
            let message = null;
            let description = 'Unknown error';
            let link = null;

            if (typeof errorData === 'object') {
                if (errorData.id == undefined) {
                    if (JSON.stringify(errorData) === '{}') {
                        console.log(errorData)
                        message = 'console log error';
                    } else message = errorData;
                } else {
                    let getData = await pgMaster.error_code.findOne({ where: { id: errorData.toUpperCase() } });
                    if (getData) {
                        let data = getData.toJSON();
                        status = data.status;
                        code = data.code;
                        type = data.type;
                        message = data.message;
                        description = data.description;
                        if (errorData.message) message = errorData.message;
                    } else {
                        message = errorData.id;
                    }
                }
            } else {
                if (errorData.indexOf(' ') == -1) {
                    let getData = await pgMaster.error_code.findOne({ where: { id: errorData.toUpperCase() } });
                    if (getData) {
                        let data = getData.toJSON();
                        status = data.status;
                        code = data.code;
                        type = data.type;
                        message = data.message;
                        description = data.description;
                    } else {
                        message = errorData;
                    }
                } else {
                    message = errorData;
                }
            }

            link = linkDocs + code;
            let dataError = {
                'error': {
                    'code': parseInt(code + ''),
                    'type': type,
                    'message': message,
                    'description': description,
                    'link': link,
                }
            }
            resolve({ status: status, data: dataError });
        } catch (err) {
            console.log(err)
        }
    });
}

module.exports = errorOutput