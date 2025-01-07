var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AllTimers=require("./models/taskTimer.js")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const timerRequestsRouter=require('./routes/timerRequests')

console.log("aa")

var app = express();

const cors = require('cors');
// Use CORS middleware
app.use(cors({ origin: "http://localhost:3000" }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/timerRequests', timerRequestsRouter)

module.exports = app;
