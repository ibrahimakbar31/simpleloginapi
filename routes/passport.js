const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const dao = require('../databases/dao/index')
const config = require('../configs/global');

let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.app.secretKey
},
    function (jwtPayload, cb) {
        return cb(null, jwtPayload);
    }
));