var fs = require('fs');
var api = require('leagueapi');

api.init(process.env.API_KEY);

var fileName = './data/champions.json';

module.exports = {
	run: function(callback) {
		var options = {dataById:true};
		api.Static.getChampionList(options, function(err, champions) {
			if (err) {return next(err);}
			var json = JSON.stringify(champions, null, 4);
			fs.writeFile(fileName, json, 'utf8', callback);
			return;
		});
	}
}