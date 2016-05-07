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
		showBuild(i, lane);
		showItems(i, lane);
		showStartingItems(i, lane);
	}
	$('.champ-item').popup();
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

function showBuild(id, lane) {
	var current = '#champ' + id + 'build';
	var skills = champions[lane][id].skills;
	$(current +  ' .build-skill-button').replaceWith("&nbsp;");
	for (var i =0; i < skills.length; i++) {
		var btn = skills[i].toLowerCase();
		var colour;
		if (btn === "q") {
			colour = "blue";
		} else if (btn === "w") {
			colour = "orange";
		} else if (btn === "e") {
			colour = "violet";
		} else if (btn === "r") {
			colour = "red";
		}
		$(current + ' #build-container-' + btn + ' .build-skill-level:nth-child(' + (i+1) + ')').html("<button class='build-skill-button circular compact ui button icon " + colour + "''>"  + btn.toUpperCase() + "</button>");
	}
}

function showItems(id, lane) {
	var current = '#items' + id;
	var items = champions[lane][id].items
	$(current +  ' .item').remove();
	for (var i=0; i < items.length; i++) {
		var item = items[i].id;
		var name = items[i].name;
		$(current).append('<div class="item"> <img data-variation="inverted" data-content="'+name+'" class="ui circular image champ-item" src="/assets/items/' + item + '.png"> </div>');
	}
}
function showStartingItems(id, lane) {
	var current = '#starting-items' + id;
	var items = champions[lane][id].first;
	$(current +  ' .item').remove();
	for (var i=0; i < items.length; i++) {
		var item = items[i].id;
		var name = items[i].name;
		$(current).append('<div class="item"> <img data-variation="inverted" data-content="'+name+'" class="ui circular image champ-item" src="/assets/items/' + item + '.png"> </div>');
	}
}