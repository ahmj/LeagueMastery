var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('secret area.');
});

module.exports = router;