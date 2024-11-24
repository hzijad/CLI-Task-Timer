var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AllTimers=require("./models/taskTimer.js")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const a =new AllTimers()
a.createTimer("first")
a.startTimer("first")
a.pauseTimer("first")
console.log(a.getStatusTimer("first"))

console.log("AAAA")


module.exports = app;
