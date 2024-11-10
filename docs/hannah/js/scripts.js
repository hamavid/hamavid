$(document).ready(function(){

// Change style of navbar on scroll or resize
$(window).on('resize scroll load', function() {
    var bar = document.getElementById("topnav");
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    if (window.scrollY > 40) {
        if (windowwidth >=750) {	
        	$('.topnavbar').css('height',55);
        	$('.name').css('font-size','1.5em');
            $('.navbar-menu').css('font-size','0.9em');
            $('.navlinks').css('margin-top',55);
            //$('.navlinks-pocket').css('margin-top',44);

        }
        bar.className = "grey-blue topnavbar top" + " card-2";
    } else {
    	if (windowwidth >=750) {
    		$('.topnavbar').css('height',80);
        	$('.name').css('font-size','2em');
            $('.navbar-menu').css('font-size','1em');
            $('.navlinks').css('margin-top',80);
            //$('.navlinks-pocket').css('margin-top',64);

    	} else {
    		$('.topnavbar').css('height',55);
        	$('.name').css('font-size','1.5em');
            $('.navbar-menu').css('font-size','0.9em');
            $('.navlinks').css('margin-top',55);
            //$('.navlinks-pocket').css('margin-top',44);

    	}
	    bar.className = bar.className.replace(" card-2", ""); 
	}
});

// Make the navigation menu dis/appear on bars click for small screens
  $('.navbar-menu, #overlaybkgrnd').click(function() {
      $('.navlinks').slideToggle();
      $('#overlaybkgrnd').toggle();
  }); 
  

});
