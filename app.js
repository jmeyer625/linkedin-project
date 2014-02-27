
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var apiController = require('./Controllers/apiController');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use( express.cookieParser() );
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var LINKEDIN_API_KEY = '75h3mgw87i5orn';
var LINKEDIN_SECRET_KEY = 'XXmye7LKyeA4ftuI';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    profileFields: ['id',  'first-name', 'last-name', 'email-address', 'headline', 'connections']
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
    	return done(null, profile);
    });
  }
));

app.get('/', function (req, res){
	console.log(req.user);
	var connections = JSON.parse(JSON.stringify(req.user._json.connections.values))
	res.render('connections', {connections: connections})
});

app.get('/account', ensureAuthenticated, function (req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function (req, res){
  res.render('login', { user: req.user });
});



app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_fullprofile', 'r_network'] }), function (req, res){

  });

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/users', user.list);
app.get('/linkedin', apiController.request);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
