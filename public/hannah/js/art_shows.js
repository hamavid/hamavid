$(document).ready(function(){

// Toggle +/- when icon is clicked, and slide sibling div up or down accordingly
	$('.plusminus').click(function() {
		var toggler = $(this);
		if ( toggler.text() == "[+]") { toggler.text("[-]")}
		else {toggler.text("[+]")}
		toggler.siblings('div').slideToggle();
	});
});
