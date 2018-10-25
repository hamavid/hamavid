$(document).ready(function() {
// open small nav menu on navbar click and show overlay, close when overlay is clicked or navbars are clicked again
	$('.navbar-menu, .smallnavlinks, .overlay').click(function(){togglemenu()});
	function togglemenu() {
		$('.smallnavlinks').slideToggle();$('#overlaybkgrnd').fadeToggle();
	};


// make sure menus match active tab on menu click
	$('.smallnavlinks li, .nav-tabs li a').click(function(){matchingmenus(event)});
	function matchingmenus(event){
		// get the name of the active tab
		var activetab = $(event.target).closest('a').attr('href');
		// remove active/current class from all li elements in all nav menus
		$('.smallnavlinks li, .nav-tabs li').removeClass('current').removeClass('active');
		// add active/current class to appropriate li elements in all nav menus
		// NOTE: I'm using the 'current' class as a substitute for 'active' for styling the menus, 
		// but don't actually add 'active' class to original .nav-tabs list elements  
		// because that messes up whatever bootstrap does with them
		$('.smallnavlinks a[href="'+activetab+'"] li').addClass('current').addClass('active');
		$('.nav-tabs a[href="'+activetab+'"]').closest('li').addClass('current');
	}


	// Change style of navbar on scroll or resize
	$(window).on('scroll', function() {
		var windowwidth=window.innerWidth || 
    	document.documentElement.clientWidth || 
    	document.body.clientWidth;
		if (window.scrollY > 40 || windowwidth < 750) {
			$('header').css('height',57);
			$('.nav-tabs, .nav-tabs li a').addClass('scroll-tabs');
	        $('.name img').addClass('scroll-name');
	        $('table.coverimagetable').css('margin-top',57);
	    } else {
	    	$('header').css('height',107);
			$('.nav-tabs, .nav-tabs li a').removeClass('scroll-tabs');
	        $('.name img').removeClass('scroll-name');
	        $('table.coverimagetable').css('margin-top',107);
	    }
	});

});

