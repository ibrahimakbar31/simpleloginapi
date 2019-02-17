const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check'); 

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        //res.render('index', { title: 'Express' });
        res.send('index root')
    } catch (err) {
        console.log(err)
        
    }
});

module.exports = router;
