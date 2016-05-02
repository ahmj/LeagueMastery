var fs = require('fs');
var api = require('leagueapi');

api.init(process.env.API_KEY);

var fileName = './data/champions.json';

module.exports = {
	run: function(callback) {
		try {
			fs.accessSync(fileName, fs.F_OK);
			return;
		}
		catch (err) {
			var options = {dataById:true};
			api.Static.getChampionList(options, function(err, champions) {
				if (err) {return callback(err);}
				var json = JSON.stringify(champions, null, 4);
				fs.writeFile(fileName, json, 'utf8', callback);
				return;
			});
		}
	}
}