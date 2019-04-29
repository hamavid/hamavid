$(document).ready(function(){

	// populate photo windows with img backgrounds
	var imglist = $('.photobook img');
	$.each(imglist, function(){
		var imgsrc = $(this).data('src');
		$(this).css('background-image', 'url(' + imgsrc + ')');
	});

	// show image captions on img hover
	$('.photobook img').on('mouseenter',function(){
		$(this).next().css('opacity','1');
	});
	$('.photobook img').on('mouseleave',function(){
		$(this).next().css('opacity','0');
	});

	// show full size images on img click
	$('img').click(function() {
		var imgsrc = $(this).data('src');
		location.href=imgsrc;
	});


	 // show/hide photos on button click
  	$('.picture-toggle-button').click(function(){
		$('.photobook img').slideToggle();
		var button=$('.picture-toggle-button');
		if (button.html() == 'Hide photos') {button.html('Show photos')}
		else {button.html('Hide photos')};
  	});


});