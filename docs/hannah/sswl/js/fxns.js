$(document).ready(function() {

// trigger nav menu/overlay toggling and MENU/X-out functions when various things are clicked
	$('.navbar-menu, .smallnavlinks, .overlay').click(function(){togglemenu();togglex()});

// show/hide small nav menu and overlay
	function togglemenu() {
		$('.smallnavlinks').slideToggle();$('#overlaybkgrnd').fadeToggle();
	};
// change "MENU" to "X" and back
	function togglex() {
		var now = $('.navbar-menu').html();
		if (now == 'MENU') {$('.navbar-menu').html('X');}
		else {$('.navbar-menu').html('MENU');}
	}	

// make sure menu matches active tab on menu click
	$('.smallnavlinks li, .smallnavlinks li a').click(function(){matchingmenu($(this))});
	function matchingmenu(e){
		// get the name of the active tab
		activetab = e.parent().attr('href');
		// remove active/current class from all li elements in nav menu
		$('.smallnavlinks li').removeClass('current').removeClass('active');
		// add active/current class to appropriate li element in nav menu
		// NOTE: I'm using the 'current' class as a substitute for 'active' for styling the menu, 
		// but don't actually add 'active' class to original .nav-tabs list elements  
		// because that messes up whatever bootstrap does with them
		$('.smallnavlinks a[href="'+activetab+'"] li').addClass('current').addClass('active');
	}

});

