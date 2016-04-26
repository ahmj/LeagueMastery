var express = require('express');
var router = express.Router();

router.use(function summonerLog(req, res, next) {
	if (req.params.id) {
		console.log("Summoner: " + req.params.id + "Time: " + Date.now());
	};
	next();
});
router.get('/', function(req, res, next) {
	res.send("Hello!");
});

router.get('/:summoner', function(req, res, next) {

});

module.exports = router;
/*
TODO: Convert summoner name to id
	  If cache -> return
	  else
	  Grab Mastery Data
	  Process results
	  Store in redis cache
	  Send response
*/