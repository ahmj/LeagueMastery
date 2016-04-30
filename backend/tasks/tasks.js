var championStaticData = require('./champion-static-data');
var ggStaticData = require('./gg-static-data');
module.exports = {
	init: function(callback) {
		championStaticData.run(function(err) {
			if (err) {return console.log("Error when retrieving champion static data...");}
			console.log("Champion Static data updated: " + new Date().toISOString());
		});
		ggStaticData.run(function(err) {
			if (err) {return console.log("Error when retrieving GG static data...");}
			console.log("GG Static data updated: " + new Date().toISOString());
		});
	}
}