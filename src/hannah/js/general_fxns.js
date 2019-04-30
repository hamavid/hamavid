// Open and close sidenav
  function open_sidenav() {
      document.getElementById("sidenav").style.display = "block";
      document.getElementById("overlaySidenav").style.display = "block";
  }
   
  function close_sidenav() {
      document.getElementById("sidenav").style.display = "none";
      document.getElementById("overlaySidenav").style.display = "none";
  }

$(document).ready(function(){
	// Check if user is using a mouse vs touchscreen via hovering and add fatfingers class to menu items if touching
	function hovercheck(action) {
		if (action === 'hovering') {
			$('.sidenav a').removeClass('fatfingers');
		}
		if (action === 'touching') {
			$('.sidenav a').addClass('fatfingers');
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
});