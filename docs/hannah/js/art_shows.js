$(document).ready(function(){

  // file paths etc
	var imgdir = '../../images/shows/';
	/*var images = document.getElementById('mainshows').getElementsByTagName('img');*/
	var srcList = $('#mainshows img').map(function() {return this.src.slice(this.src.indexOf('/images'));}).get();
	var showdict = {};
	showdict['2012_09_choco_wally'] = 'Chocolati Wallingford, Sep 2012';
	showdict['2017_09_vita'] = 'Caffe Vita Fremont, Sep 2017';
	showdict['bsi'] = 'Black Sheep Inn, Chugchilan (Ecuador), Apr 2007';
	showdict['enfield'] = 'Enfield Laundry Room, Hampshire College, May 2011';

  // look up which show an image is from, using the show dictionary (via string in the img src)
  	function whichshow(thisimg) {for (var key in showdict) {if (thisimg.includes(key)) {return showdict[key];}};};
  // toggle which-show caption up and down on click
  	$('.downup,.showidcontainer').click(function () {$('.showid,.showidcontainer').slideToggle();});
  	$('.showid').click(function() {$('.showid,.showidcontainer').slideToggle()});

  // iterate back and forward through images in slideshow
  	function iterate(direction) {
  		var thisimg=$('figure img').attr('src').slice($('figure img').attr('src').indexOf('/images'));
		for (var i = 0; i < srcList.length; i++) {if (srcList[i] == thisimg){var thisindex=i;}};
		var nextindex=(thisindex+direction) % srcList.length;
		if (nextindex < 0) {var nextindex = srcList.length-1}
		var nextimg=srcList[nextindex];showslideimg(nextimg);
  	}

  // show an image in the slides
  	function showslideimg(url){
  		$('figure img').remove(); //remove extra photos
  		$('figure').prepend($('<img/>').attr('src','../..'+url));
		//$('.theidoftheshow').html('<i class="downup fa fa-angle-double-down fa-lg"></i>'+whichshow(url)); // banner at the top saying which show the photo is from
		$('.theidoftheshow').html(whichshow(url)); // banner at the top saying which show the photo is from

  	}


  // close photo overlay and remove images if background or close button is clicked	
	$('#photo-overlay,.thisphoto,.xit').click(function() {
		if(event.target != this) return;
		else {$('#photo-overlay').css('display','none');}
	});

  // open photo overlay showing current img if image is clicked from the list
	$('.details img').click(function() {
		$('#photo-overlay').fadeToggle();
		var whichimg= this.src.slice(this.src.indexOf('/images'));
		showslideimg(whichimg);
	});

  
  // highlight left and right scroll arrows when hovering on diff areas of screen
	$('#leftside').mouseenter(function(){$('.larr').css('opacity','1');});
	$('#leftside').mouseleave(function(){$('.larr').css('opacity','0.3');});
	$('#rightside').mouseenter(function(){$('.rarr').css('opacity','1');});
	$('#rightside').mouseleave(function(){$('.rarr').css('opacity','0.3');});

  // Scroll right or left when various elements are clicked
	$('.larr, #leftside').click(function() {iterate(-1);});
	$('.rarr, #rightside').click(function() {iterate(+1);});

	// Add new image behind current image, set opacity appropriately, then remove all but new image
      // these are supposed to fade into each other but don't..
        
        /*
        $('#photoslider img:first-child').addClass('opaque').removeClass('transparent');
        $('#photoslider img:last').addClass('transparent').removeClass('opaque');
        $('img:first-child ~ img').remove(); //remove extra photos (if handle was dragged)
		/*var subwho = who.slice(who.indexOf('/images'));
  		var index = $('#mainshows [src="'+ who +'"]').index();
		var index = $('.details img').find(who).index();
		var index = $('#shows [src="'+who+'"]').index($('#mainshows'));
		var index = $(srcList).find(who).index();
		// if an image is clicked within the slideshow images, toggle to the next/previous image	
  	$('.rarr').click(function() {iterate(+1);});
  	$('.larr').click(function() {iterate(-1);});
*/

/* DEPRECATED IN FAVOR OF A SINGLE SLIDE TOGGLE BUTTON */
/*
// Toggle +/- when icon is clicked, and slide sibling div up or down accordingly
	$('.plusminus').click(function() {
		var toggler = $(this);
		if ( toggler.text() == "[+]") { toggler.text("[-]")}
		else {toggler.text("[+]")}
		toggler.siblings('div').slideToggle();
	});*/
});
