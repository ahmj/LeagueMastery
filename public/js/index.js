$(document).ready(function() {
	$('.ui.dropdown').dropdown('set selected', 'NA');
	$('#summoner').keyup(function(e){
		if (e.keyCode == 13) {
			$('#search').click();
		}
	});
	$("#search").click(function() {
		var name = $("#summoner").val();
		var region = $(".ui.dropdown").dropdown('get text');
		window.location.href = "/mastery/" + name + "/" + region;
	});
});