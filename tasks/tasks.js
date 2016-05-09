var championStaticData = require('./champion-static-data');
var ggStaticData = require('./gg-static-data');
var ggChampData = require('./gg-champ-data');

module.exports = {
	init: function(callback) {
		championStaticData.run(function(err) {
			if (err) {console.log("Error when retrieving champion static data..."); return console.log(err);}
			console.log("Champion Static data updated: " + new Date().toISOString());
			ggChampData.run(function(err) {
				if (err) {console.log("Error when retrieving championgg data..."); return console.log(err);}
				console.log("ChampionGG data updated: " + new Date().toISOString());
			})
		});
		ggStaticData.run(function(err) {
			if (err) {console.log("Error when retrieving GG static data..."); return console.log(err);}
			console.log("GG Static data updated: " + new Date().toISOString());
		});
		ggChampData.run(function(err) {
			if (err) {console.log("Error when retrieving championgg data..."); return console.log(err);}
			console.log("ChampionGG data updated: " + new Date().toISOString());
		})
	}
}