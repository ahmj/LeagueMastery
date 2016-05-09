var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {title:"League Mastery"});
});
router.get('/error', function(req, res) {
	res.render('error');
});

module.exports = router;