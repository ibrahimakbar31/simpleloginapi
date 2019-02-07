var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
require('./routes/passport')

var initialData = require('./initial_data')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLoginRouter = require('./routes/users/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/login', userLoginRouter);
app.use('/users', authUser, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function authUser(req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, loginData, info) {
        if (err) {
            console.log('error passport')
            return next(err);
        }
        let errorOutput = {
            'status': 401,
            'error': {
                'code': 12,
                'type': 'authorization',
                'message': 'wrong API access parameter or token expired',
                'description': 'wrong API access parameter or token expired. Please get new access_token with refresh_token or relogin',
                'link': null,
            }
        };
        if (!loginData) {
            return res.status(401).json(errorOutput);
        } else {
            if (!loginData.user) {
                return res.status(401).json(errorOutput);
            }
        }
        req.login = loginData;
        return next();
    })(req, res, next);
}


app.listen(app.get('port'), function () {
    console.log('listening port: ' + app.get('port'));
    console.log('environment: ' + process.env.NODE_ENV)
    const runInitialData = async () => {
        try {
            await initialData();
        } catch (error) {
            console.log('error from initial data:')
            console.log(error)
        }
    };
    runInitialData();
});

module.exports = app;