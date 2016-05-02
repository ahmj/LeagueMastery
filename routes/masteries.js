var express = require('express');
var api = require('leagueapi');
var nodeCache = require('node-cache');
var staticJson = require('../data/static-data');

var router = express.Router();
var cache = new nodeCache({stdTTL: 3600, checkperiod: 300});

var CHAMPION_SCORE_FACTOR = 1.3;
var CHAMPION_BONUS_FACTOR = 500;

api.init(process.env.API_KEY);

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
			data.sort(function (a, b) {return (b.score + b.bonus) - (a.score + a.bonus)});
			cache.set(cacheKey, data);
			return res.json(data);
		});
	});
});

function addToChampion(champion) {
	calculateScore(champion);
	appendChampionName(champion);
	appendWinRate(champion);
	appendBonusCalculation(champion);
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
	var aFactor = 25;
	var bFactor = 5;
	var cFactor = -2;
	var plusFactor = 3;
	var minusFactor = -2;

	if (grade[0] === "C" || grade[0] === "D") {return cFactor;}
	score = (grade[0] === "S") ? aFactor * 2 + score : score; 
	score += (grade[0] === "A") ? aFactor: bFactor;
	if (grade[1]) {
		if (grade[0] === "S") {
			score += (grade[1] === "+") ? plusFactor * 2 : minusFactor * 2;
		} else {
			score += (grade[1] === "+") ? plusFactor : minusFactor;
		}
	}
	return score;
}

function appendChampionName(champion) {
	var championJson = staticJson.champion();
	champion.name = championJson.data[champion.championId].name;
	return champion;
}
function appendWinRate(champion) {
	var ggJson = staticJson.gg();
	champion.overallWin = 0;
	champion.overallPos = "none";
	champion.roles = {};
	for (var i = 0; i < ggJson.length; i++) {
		var current = ggJson[i];
		if (current.name == champion.name) {
			if (champion.overallWin < current.general.winPercent) {
				champion.overallWin = current.general.winPercent;
				champion.overallPos = current.role;
			}
			champion.roles[current.role] = current.general.winPercent;
		}
	}
	return champion;
}
function appendBonusCalculation(champion) {
	champion.bonus = CHAMPION_BONUS_FACTOR * (champion.overallWin / 100);
	return champion;
}
module.exports = router;
/*
TODO: - Balance suggestion scoring functions
	  - Fix async issues with fetching static json files
*/