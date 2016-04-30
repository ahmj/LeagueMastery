var championStaticData = require('./champion-static-data');
var ggStaticData = require('./gg-static-data');
module.exports = {
	init: function(callback) {
		championStaticData.run(function() {
			console.log("Champion Static data updated: " + new Date().toISOString());
		});
		ggStaticData.run(function() {
			console.log("GG Static data updated: " + new Date().toISOString());
		});
	}
}