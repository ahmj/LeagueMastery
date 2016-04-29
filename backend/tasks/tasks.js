var championStaticData = require('./champion-static-data');

module.exports = {
	init: function() {
		championStaticData.run(function() {
			console.log("Champion Static data updated: " + new Date().toISOString());
		});
	}
}