const express = require('express');
const router = express.Router();
const dao = require('../../databases/dao/index');
const errorOutput = require('../../helpers/error');

router.get('/profile', async (req, res) => {
    try {
        let data = await dao.user.getById(req.login.user.id)
        if (!data) throw ('USER_ID_INVALID')
        delete data.password;
        delete data.refresh_token;
        res.status(200).json({
            user: data
        });
    } catch (err) {
        let errorData = await errorOutput(err);
        res.status(errorData.status).json(errorData.data);
    }
});

module.exports = router;
