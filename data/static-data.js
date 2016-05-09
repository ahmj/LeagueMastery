var fs = require('fs');
var nodeCache = require('node-cache');

var championJsonPath = './data/json/champions.json';
var ggJsonPath = './data/json/static-gg.json';
var ggChampJsonPath = './data/json/champ-gg.json';

var cache = new nodeCache({stdTTL: 0, checkperiod:0});
module.exports = {
	champion: function() {
		try {
			var cached = cache.get("championstatic");
			if (cached) {return cached;}
			fs.accessSync(championJsonPath, fs.F_OK);
			var json = JSON.parse(fs.readFileSync(championJsonPath, 'utf8'));
			cache.set("championstatic", json);
			return json;
		} catch(err) {
			return err;
		}
	},

	gg: function() {
		try {
			var cached = cache.get("ggstatic");
			if (cached) {return cached;}
			fs.accessSync(ggJsonPath, fs.F_OK);
			var json = JSON.parse(fs.readFileSync(ggJsonPath, 'utf8'));
			cache.set("ggstatic", json);
			return json;
		} catch(err) {
			return err;
		}
	},

	ggChamp: function() {
		try {
			var cached = cache.get("ggchamp");
			if (cached) {return cached;}
			fs.accessSync(ggChampJsonPath, fs.F_OK);
			var json = JSON.parse(fs.readFileSync(ggChampJsonPath, 'utf8'));
			cache.set("ggchamp", json);
			return json;
		} catch(err) {
			return err;
		}
	}
}