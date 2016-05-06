var champions = {
	top: [],
	adc: [],
	support: [],
	middle: [],
	jungle: [],
	overall: []
};
getJSON();
$(document).ready(function() {
	$('.ui.accordion').accordion();
	var path = window.location.pathname;

	$('#overall').click(function() {
		$('#lanes .buttons .green').removeClass('green').addClass('red');
		$(this).removeClass('red').addClass('green');
		updateCurrentLane('overall');
	});
	$('#top').click(function() {
		$('#lanes .buttons .green').removeClass('green').addClass('red');
		$(this).removeClass('red').addClass('green');
		updateCurrentLane('top');
	});
	$('#jungle').click(function() {
		$('#lanes .buttons .green').removeClass('green').addClass('red');
		$(this).removeClass('red').addClass('green');
		updateCurrentLane('jungle');
	});
	$('#middle').click(function() {
		$('#lanes .buttons .green').removeClass('green').addClass('red');
		$(this).removeClass('red').addClass('green');
		updateCurrentLane('middle');
	});
	$('#adc').click(function() {
		$('#lanes .buttons .green').removeClass('green').addClass('red');
		$(this).removeClass('red').addClass('green');
		updateCurrentLane('adc');
	});
	$('#support').click(function() {
		$('#lanes .buttons .green').removeClass('green').addClass('red').transition;
		$(this).removeClass('red').addClass('green');
		updateCurrentLane('support');
	});
	
});
function getJSON() {
	$(document).on({
	    ajaxStart: function() { $('#masteries .ui .segment').addClass("loading");    },
	     ajaxStop: function() { $('#masteries .ui .segment').removeClass("loading"); }    
	});
	var path = window.location.pathname;
	$.get('/api' + path, function(data) {
		champions.overall.push(data[0]);
		champions.overall.push(data[1]);
		champions.overall.push(data[2]);
		for (var key in data) {
			if (data[key].overallPos === "Top") {
				champions.top.push(data[key]);
			} else if(data[key].overallPos === "ADC") {
				champions.adc.push(data[key]);
			} else if(data[key].overallPos === "Support") {
				champions.support.push(data[key]);
			} else if(data[key].overallPos === "Jungle") {
				champions.jungle.push(data[key]);
			} else if(data[key].overallPos === "Middle") {
				champions.middle.push(data[key]);
			}
		}
		updateCurrentLane('overall');
	});
}
function updateCurrentLane(lane) {
	for (var i=0; i < 3; i++) {
		showChampions(i, lane);
		showStatistics(i, lane);
	}
}
function showChampions(id, lane) {
	var current = '#champ' + id;
	var name = champions[lane][id].name;
	var key = champions[lane][id].champKey;
	$(current + ' .champ-icon').attr('src', '/assets/champions/' + key + '.png');
	$(current + ' .champ-name').text(name);
}

function showStatistics(id, lane) {
	var current = '#stats' + id;
	var score = champions[lane][id].score;
	var bonus = champions[lane][id].bonus;
	var overallWin = champions[lane][id].overallWin;
	var highestGrade = champions[lane][id].highestGrade;
	var overallPos = champions[lane][id].overallPos
	var level = champions[lane][id].championLevel;
	$(current + ' .score .value').text((score + bonus).toFixed(2));
	$(current + ' .winrate .value').text(overallWin + "%");
	if (!highestGrade) {highestGrade = "N/A"}
	$(current + ' .highestGrade .value').text(highestGrade);
	$(current + ' .position .value').text(overallPos);
	$(current + ' .level .value img').attr('src', '/assets/levels/' + level + '.png');
}