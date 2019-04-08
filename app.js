const express = require('express');
let createError = require('http-errors');
let path = require('path');


const app = express();
let indexRouter = require('./routes/index');

app.use('/public/index', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/*
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');

//let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let signupRouter = require('./routes/cadastro');
let logoutRouter = require('./routes/logout');
let leituraRouter = require('./routes/leitura');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'lalala',
  resave: false,
  saveUninitialized: true,
  cookie: {
    name: 'testeNome',
    secure: 'auto',
    maxAge: new Date(Date.now() + (3600000))
 }
}));

app.use((req, res, next) => {
  next();
});

//app.use('/', indexRouter);
//app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/cadastro', signupRouter);
app.use('/logout', logoutRouter);
app.use('/leitura', leituraRouter);

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
  return res.status(err.status || 500);
  res.render('error');
});
*/ 