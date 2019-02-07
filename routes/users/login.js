const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const dao = require('../../databases/dao/index');
const errorOutput = require('../../helpers/error');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { tokenLogin } = require('../../helpers/token')

router.post('/',
    check('id')
        .trim()
        .escape()
        .exists().withMessage('INPUT_ID_REQUIRED')
        .not().isEmpty().withMessage('INPUT_ID_REQUIRED')
        .not().isBoolean().withMessage('INPUT_INVALID'),
    check('password')
        .exists().withMessage('INPUT_PASSWORD_REQUIRED')
        .not().isEmpty().withMessage('INPUT_PASSWORD_REQUIRED')
        .not().isBoolean().withMessage('INPUT_INVALID'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw errors.array()[0].msg;
            let user = null;
            if (validator.isEmail(req.body.id) == true) {
                user = await dao.user.getByEmail(req.body.id)
            } else user = await dao.user.getByUsername(req.body.id)
            if (!user) throw ('AUTH_FAILED');
            const compare = await bcrypt.compare(req.body.password + '', user.password);
            if (compare == false) throw ('AUTH_FAILED');
            let tokenData = await tokenLogin(user.id);
            res.status(200).json({
                access_token: tokenData.accessToken,
                refresh_token: tokenData.refreshToken,
                expired: tokenData.expired,
            });
        } catch (err) {
            let errorData = await errorOutput(err);
            res.status(errorData.status).json(errorData.data);
        }
    });

module.exports = router;