$(document).ready(function(){

// Change style of navbar on scroll or resize
$(window).on('resize scroll load', function() {
    var bar = document.getElementById("topnav");
    var blog = document.getElementById("bottomsmallnav");
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    if (window.scrollY > 40) {
        if (windowwidth >=750) {	
        	$('.topnavbar').css('height',50);
        	$('.name img').css('height',40);
        	$('.name img').css('margin-top',5);
        	$('.navlinks').css('font-size',15);
        	$('.navlinks a').css('line-height','10px');
        	$('.navlinks a').css('margin-top',5);
        	$('.navlinks a').css('border-radius',5);
        	$('.banner').css('margin-top',50);
        }
        bar.className = "light-grey topnavbar top" + " card-2";
        blog.className = "smallnavlinks light-grey" + " card-2-alt";
    } else {
    	if (windowwidth >=750) {
    		$('.topnavbar').css('height',80);
        	$('.name img').css('height',60);
        	$('.name img').css('margin-top',10);
        	$('.navlinks').css('font-size',20);
        	$('.navlinks a').css('line-height','20px');
        	$('.navlinks a').css('margin-top',10);
        	$('.navlinks a').css('border-radius',10);
        	$('.banner').css('margin-top',80);
    	} else {
    		$('.topnavbar').css('height',50);
        	$('.name img').css('height',40);
        	$('.name img').css('margin-top',5);
        	$('.navlinks').css('font-size',15);
        	$('.navlinks a').css('line-height','10px');
        	$('.navlinks a').css('margin-top',5);
        	$('.navlinks a').css('border-radius',5);
        	$('.banner').css('margin-top',50);
    	}
	    bar.className = bar.className.replace(" card-2", ""); 
	    blog.className = blog.className.replace(" card-2-alt", "");  
	}
});

// Make the navigation menu dis/appear on bars click for small screens
  $('.navbar-bars, #overlaybkgrnd').click(function() {
      $('.smallnavlinks').slideToggle();
      $('#overlaybkgrnd').toggle();
  }); 
  

// Make menu disappear if screen is enlarged past where bars show
// and position and size banner img
  $(window).on('resize load', function() {
	var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    var windowheight=$(window).height();
    var bannerheight;
    if (windowwidth >=750) {bannerheight = windowheight-80;}
    else {bannerheight=windowheight-50;}
    var origh = 1836;
    var origw = 3264
    //var fullbannerwidth = bannerheight/460*2456; // orig img is 460x2456px
    var fullbannerwidth = bannerheight/origh*origw // orig img is 1836x3264
    var hiddenbannerhalf = (fullbannerwidth-windowwidth)/2;
    if (windowwidth <= fullbannerwidth) {
    	$('.banner').css('height',bannerheight);
    	$('.banner img').css('height',bannerheight);
    	$('.banner img').css('width',fullbannerwidth);
    	$('.banner img').css('margin-left',-hiddenbannerhalf);
    } else {
    	$('.banner').css('height',bannerheight);
    	$('.banner img').css('height',origh/origw*windowwidth);
    	$('.banner img').css('width',windowwidth);
    	$('.banner img').css('margin-left',0);
    }
    if (windowwidth >=500) {
    	$('.smallnavlinks').css('display','none');
        $('#overlaybkgrnd').css('display','none');
    }	
  });	

});
