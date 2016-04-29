var express = require('express');
var api = require('leagueapi');
var nodeCache = require('node-cache');
var championJson = require('../data/champions.json');

var router = express.Router();
var cache = new nodeCache({stdTTL: 3600, checkperiod: 300});

var CHAMPION_SCORE_FACTOR = 5;

api.init(process.env.API_KEY);
router.use(function summonerLog(req, res, next) {
	if (req.params.summoner) {
		console.log("Summoner: " + req.params.summoner + "Time: " + Date.now());
	};
	next();
});
router.get('/', function(req, res, next) {
	res.send("Hello!");
});

router.get('/:summoner/:region', function(req, res, next) {
	var summoner = (req.params.summoner).toLowerCase();
	var region = req.params.region;

	var cacheKey = summoner + region;
	var cached = cache.get(cacheKey);
	if (cached) {return res.json(cached);}
	
	api.Summoner.getByName(summoner, region, function(err, summonerName) {
		if (err) return next(err); 
		var id = summonerName[summoner].id;
		api.ChampionMastery.getChampions(id, region, function(err, champions) {
			if (err) return next(err);
			var data = [];
			for (var i=0; i < champions.length; i++) {
				if (!champions[i].chestGranted) {
					addToChampion(champions[i]);
					data.push(champions[i]);
				}
			}
			data.sort(function (a, b) {return b.score - a.score});
			cache.set(cacheKey, data);
			return res.json(data);
		});
	});
});

function addToChampion(champion) {
	calculateScore(champion);
	appendChampionName(champion);
}
function calculateScore(champion) {
	var champion_grade_factor = 0;
	if (champion.highestGrade) {
		champion_grade_factor = calculateGradeScore(champion.highestGrade);
	}
	champion.score = champion_grade_factor + (CHAMPION_SCORE_FACTOR * champion.championLevel);
	return champion;
}

function calculateGradeScore(grade) {
	var score = 0;
	if (grade[0] === "S") {
		score = 13;
	}
	if (grade[0] === "A") {
		score = 7; 
	}
	if (grade[0] === "B") {
		score = 3; 
	}
	if (grade[1] && grade[1] === "-") {
		score -= 2;
	} else if (grade[1] && grade[1] === "+") {
		score += 3;
	}
	return score;
}

function appendChampionName(champion) {
	champion.name = championJson.data[champion.championId].name;
	return champion;
}

module.exports = router;
/*
TODO: - Incorperate champion.gg roles and winrates
*/