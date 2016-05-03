require('dotenv').config();

var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var tasks = require('./tasks/tasks').init();
var mastery = require('./routes/mastery');

var port = process.env.PORT || 3000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/mastery', mastery);

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});
app.listen(port, function() {
	console.log('App listening on port:' + port);
});