/*const express = require('express');
let createError = require('http-errors');
let path = require('path');



let indexRouter = require('./routes/index');

const app = express();


app.set('public', path.join(__dirname, 'public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  next();
});
app.use('/', indexRouter);



app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.status(err.status || 500);
  return res.render('error');
});

module.exports = app; */