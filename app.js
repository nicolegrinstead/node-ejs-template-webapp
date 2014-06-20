
/**
 * Module dependencies.
 */

var express = require('express');
var connect = require('connect');
var routes = require('./routes');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var package = require('./package.json');
var resources = require('./app.resources.js');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(expressLayouts);
/*app.use(express.logger('dev'));
app.use(express.json());								These have been migrated 
app.use(express.urlencoded());							to various other sub projects
app.use(express.methodOverride());						See: https://github.com/senchalabs/connect
app.use(express.cookieParser('your secret here'));		to add them back in
app.use(express.session());*/
app.use(express.static(path.join(__dirname, 'public')));

app.set('jsFiles', resources.jsFiles);
app.set('cssFiles', resources.cssFiles);
app.set('version', package.version);

var isDevelopment = (process.env.NODE_ENV !== 'production');
var port = process.env.PORT || 5000;

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	//app.use(express.errorHandler());
	//mongoose.connect("some mongo db url");
   // configure stuff here
}
if ('production' == env) {
   // configure stuff here
}

//routes
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
