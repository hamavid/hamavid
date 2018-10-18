$(document).ready(function() {
// open small nav menu on navbar click and show overlay, close when overlay is clicked or navbars are clicked again
	$('.navbar-menu, .smallnavlinks, .overlay').click(function(){togglemenu()});
	function togglemenu() {
		$('.smallnavlinks').slideToggle();$('#overlaybkgrnd').fadeToggle();
	};


// make sure menus match active tab on menu click
	$('.smallnavlinks li, .nav-tabs li a').click(function(){matchingmenus(event)});
	function matchingmenus(event){
		// Fix header width (I don't know why this is happening; only on past shows tab)
		//$('header').css('width',innerWidth + 'px');
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

// make sure elements stay within window size
  //$(window).on('resize',stay_contained); 
 // stay_contained();
	function stay_contained() {
		w = $(window).width();
		console.log(w);
		$('body').css('width',w+'px');
	}

});

