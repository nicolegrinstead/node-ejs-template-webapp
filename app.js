
/**
 * Module dependencies.
 */

var express = require('express');
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
console.log(__dirname);
//app.set('layout', 'master');
app.use(expressLayouts);
app.use(app.router);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('jsFiles', resources.jsFiles);
app.set('cssFiles', resources.cssFiles);
app.set('version', package.version);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var isDevelopment = (process.env.NODE_ENV !== 'production');
var port = process.env.PORT || 5000;

/*
app.configure('development', function(){
    mongoose.connect("some mongo db url");
    app.set("development", true);
});

app.configure('production', function(){
    mongoose.connect("some mongo db url");
    app.set("development", false);
});
*/

//routes
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
