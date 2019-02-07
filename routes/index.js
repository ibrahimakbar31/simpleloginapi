const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    res.send('index root')
});

module.exports = router;
