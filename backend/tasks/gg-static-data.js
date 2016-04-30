var api = require('node-gg');
var fs = require('fs');

api = api.init(process.env.GG_KEY);

var fileName = './data/static-gg.json';

module.exports = {
	run: function(callback) {
		try {
			fs.accessSync(fileName, fs.F_OK);
			return;
		}
		catch (err) {
			fs.writeFileSync(fileName, JSON.stringify({message: ""}));
			api.statistics.all(function(err, data) {
				if (err) {fs.unlinkSync(fileName); return callback(err);}
				var json = JSON.stringify(data);
				fs.writeFile(fileName, json, 'utf8', callback);
				return;
			});
		}
	}
}