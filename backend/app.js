require('dotenv').config();

var express = require('express');
var routes = require('./routes/index');
var masteries = require('./routes/masteries');

var port = process.env.PORT || 3000;
var app = express();

app.use('/', routes);
app.use('/mastery', masteries);

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});
app.listen(3000, function() {
	console.log('App listening on port: 3000');
});