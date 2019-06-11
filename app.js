var createError =    require('http-errors');
var express =        require('express');
var path =           require('path');
var cookieParser =   require('cookie-parser');
var logger =         require('morgan');
var indexRouter =    require('./routes/index');
var app =            express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(function(req, res, next) {
  var ext = path.extname(req.path);
  if (ext == '.gif')                  { res.redirect('/images/spacer.gif'); return; }
  if (ext == '.png')                  { res.redirect('/images/spacer.png'); return; }
  if (ext == '.js' || ext == '.css')  {
    res.send('/* blackhole: https://github.com/OutsourcedGuru/blackhole */');
    return;
  }
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message =  err.message;
  res.locals.error =    req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
