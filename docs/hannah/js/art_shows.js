$(document).ready(function(){

  // file paths etc
	var imgdir = '../../images/shows/';
	/*var images = document.getElementById('mainshows').getElementsByTagName('img');*/
	var srcList = $('#mainshows img').map(function() {return $(this).data('src').slice($(this).data('src').indexOf('/images'));}).get();
	var showdict = {};
	showdict['2020_09_kens'] = 'Ken&#39;s Market, Sep 2020';
	showdict['2020_04_space'] = 'SPACE at Magnuson, Apr/May 2020';
	showdict['2019_05_cortona'] = 'Cortona Caf&eacute;, May/Jun 2019';
	showdict['2019_02_choco_wally'] = 'Chocolati Wallingford, Feb 2019';
	showdict['2019_01_freshflours'] = 'Fresh Flours Phinney Ridge, Jan 2019';
	showdict['2018_gsb'] = 'Garvey Schubert Barer 10 month loan, 2018';
	showdict['2018_11_kadima'] = 'Kadima Winter Art Sale, Nov 2018';
	showdict['2018_07_freshflours'] = 'Fresh Flours West Seattle, Jul 2018';
	showdict['2018_01_01_freshflours'] = 'Fresh Flours Phinney Ridge, Jan/Feb 2018';
	showdict['2012_09_choco_wally'] = 'Chocolati Wallingford, Sep 2012';
	showdict['2017_12_choco_wally'] = 'Chocolati Wallingford, Dec, 2017';
	showdict['2017_09_vita'] = 'Caffe Vita Fremont, Sep 2017';
	showdict['bsi'] = 'Black Sheep Inn, Chugchilan (Ecuador), Apr 2007';
	showdict['enfield'] = 'Enfield Laundry Room, Hampshire College, May 2011';

  // show/hide photos on button click
  	$('.picture-toggle-button').click(function(){
		$('.photos').slideToggle();
		var button=$('.picture-toggle-button');
		if (button.html() == 'Hide photos') {button.html('Show photos')}
		else {button.html('Hide photos')};
  	});
  	
  // lazy load images as user scrolls down
  // not sure if this is a good idea or working
  	$(window).on('load scroll', function() {lazy();});
  	function lazy() {
        //check if your div is visible to user
        // CODE ONLY CHECKS VISIBILITY FROM TOP OF THE PAGE
		var imglist = $('#mainshows img');
		$.each(imglist, function(){
			if ($(window).scrollTop() + $(window).height() >= $(this).offset().top) {
				var imgsrc = $(this).data('src');
				$(this).css('background-image', 'url(' + imgsrc + ')');
				//if ($(this).attr('src') != imgsrc) {$(this).attr('src', imgsrc);}
				$(this).addClass('visible-image');
        	}	
		});
    };	


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
		var whichimg = $(this).data('src').slice($(this).data('src').indexOf('/images'));
		//var whichimg= this.src.slice(this.data-src.indexOf('/images'));
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

  // SWIPE  
    $('.thisphoto').touchwipe({
      wipeLeft: function() {iterate(+1);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
    $('.thisphoto').touchwipe({
      wipeRight: function() {iterate(-1);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });


});
