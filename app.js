
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes'), 
    auth=require('./routes/auth.js');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
var app = module.exports = express();
var session = require('express-session');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');



  app.set('views', __dirname + '/views');
  app.engine('.html', exphbs({defaultLayout: 'single', extname: '.html'}));
  app.set('view engine', '.html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('X-HTTP-Method-Override'));
  //app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(cookieParser());
  app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
  }));

app.use(function (req, res, next) {
  
  next()
});


app.get('/', routes.index);
app.get('/home', routes.home);
app.post('/create',auth.create);
app.post('/auth',auth.login);
app.get('/logout',auth.logout);
app.post('/update',auth.update)


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
