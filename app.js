var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middleware/authenticate'))
app.use('/', require('./routes/index'));
app.use(require('./middleware/error-handler'));

process.addListener('uncaughtException', function(err) {
    console.error('Uncaught error in server.js', {
        err: err,
        stack: err.stack
    });
    // TODO some sort of notification
    process.exit(1);
});

module.exports = app;
