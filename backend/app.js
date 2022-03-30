//express 기본지원 모듈
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


//추가 모듈
require('dotenv').config();
var session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport/index');
var connectHistory = require('connect-history-api-fallback');

var app = express();
passportConfig();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.COOKIE_SECRET)); //cookieParser와 express-session은 동일한 쿠키비밀키를 사용해야함
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie : {
    httpOnly : true,
    secure : false
  }
}));
app.use(passport.initialize());
app.use(passport.session());


//index.html 라우터
var indexRouter = require('./routes/index');

//API 라우터
var authRouter = require('./routes/auth');
var projectRouter = require('./routes/project');
var userRouter = require('./routes/user');
var teamRouter = require('./routes/team');


app.use('/', indexRouter);
app.use('/engine/auth', authRouter);
app.use('/engine/pj', projectRouter);
app.use('/engine/user', userRouter);
app.use('/engine/team', teamRouter);


app.use(connectHistory());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
