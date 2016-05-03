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
		$('#main')
			.transition({
				animation: 'scale',
				duration: '1s',
				onComplete: function() {
					window.location.href = "/mastery/" + name + "/" + region;
				}
			});
	});
});