const fs = require('fs');

let dao = {};
fs.readdirSync(__dirname).forEach(file => {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        let name = file.replace('.js', '');
        let Pathneed = require('./' + file);
        dao[name] = new Pathneed();
    }
})

module.exports = dao