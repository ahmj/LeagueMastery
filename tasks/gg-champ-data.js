var api = require('node-gg');
var fs = require('fs');
var async = require('async');

api = api.init(process.env.GG_KEY);

var fileName = './data/json/champ-gg.json';
var championJsonPath = './data/json/champions.json';

module.exports = {
	run: function(callback) {
		try {fs.accessSync(championJsonPath, fs.F_OK);} 
		catch(err) {return callback(err);}
		try {
			fs.accessSync(fileName, fs.F_OK);
			return;
		}
		catch (err) {
			var json = JSON.parse(fs.readFileSync(championJsonPath, 'utf8'));
			var output = {};
			async.forEachOf(json.data, function(value, key, callback){
				api.champions.data.specific(value.key, function(err, data) {
					if (err) {return callback(err);}
					output[value.key] = [];
					for (var key in data) {
						var processed = {}
						processed.role = data[key].role;
						processed.items = data[key].items.highestWinPercent.items;
						processed.firstItems = data[key].firstItems.highestWinPercent.items;
						processed.skills = data[key].skills.highestWinPercent;
						output[value.key].push(processed);
					}
					callback();
				});
			}, function(err) {
				if (err) {return callback(err);}
				var json = JSON.stringify(output, null, 4);
				fs.writeFile(fileName, json, 'utf8', callback);
				return;
			});
		}
	}
}