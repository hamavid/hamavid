$(document).ready(function(){

	// populate photo windows with img backgrounds
	var imglist = $('.photobook img');
	$.each(imglist, function(){
		var imgsrc = $(this).data('src');
		$(this).css('background-image', 'url(' + imgsrc + ')');
	});

	// Check if user can hover and format image captions accordingly
	function hovercheck(action) {
		if (action === 'hovering') {
			$('.photobook img').on('mouseenter',function(){
				$(this).css('opacity','0.3');
				$(this).next().css('opacity','1');
			});
			$('.photobook img').on('mouseleave',function(){
				$(this).css('opacity','1');
				$(this).next().css('opacity','0');
			});
		}
		if (action === 'touching') {
			$('.photobook div div').removeClass('overlaid');
			$('.photobook div div').addClass('bottom');
		}
	}
	window.addEventListener('mouseover', function onFirstHover() {
    	hovercheck('hovering');
    	window.removeEventListener('mouseover', onFirstHover, false);
	}, false);
	window.addEventListener('touchstart', function onFirstTouch() {
	    hovercheck('touching');
	    window.removeEventListener('touchstart', onFirstTouch, false);
	}, false);


	// show full size images on img click
	$('img').click(function() {
		var imgsrc = $(this).data('src');
		location.href=imgsrc;
	});
  

	 // show/hide photos on button click
  	$('.picture-toggle-button').click(function(){
		$('.photobook img, figure, .photobook div div').slideToggle();
		var button=$('.picture-toggle-button');
		if (button.html() == 'Hide photos') {button.html('Show photos')}
		else {button.html('Hide photos')};
  	});


});