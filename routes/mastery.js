var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send("Hello!");
});

router.get('/:summoner/:region', function(req, res, next) {
	var summoner = (req.params.summoner);
	var region = (req.params.region).toLowerCase();
	return res.render('mastery', {title: summoner});
});

module.exports = router;