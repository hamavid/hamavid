$(document).ready(function(){

/* dictionary of image captions and tags*/
var imgdict = {};
imgdict['sommer.jpg'] = ['Sommer, watercolor on paper 2024',['watercolor','portrait']];
imgdict['happybday.png'] = ['Hap py bday teddy bear balloons, linoleum block print 2024',['linocut']];
imgdict['nude1.jpg'] = ['Nude study 1, watercolor on paper 2024',['watercolor']];
imgdict['nude2.jpg'] = ['Nude study 2, watercolor on paper 2024',['watercolor']];
imgdict['merryxmas4.png'] = ['Merry Xmas ambigram, pen on paper 2023',['ambigram','drawing']];
imgdict['hbd-2.png'] = ['Happy/Birth Day ambigram, pen on paper 2023',['ambigram','drawing']];
imgdict['thankyou-ambi.png'] = ['Thank You ambigram, pen on paper 2023',['ambigram','drawing']];
imgdict['hbd-ambi.png'] = ['Happy Birthday ambigram, pen on paper 2023',['ambigram','drawing']];
imgdict['owlrockfarm.png'] = ['Owl Rock Farm logo, commissioned linoleum block print 2023',['linocut']];
imgdict['hotstuff.jpeg'] = ['Fire Cider, linoleum block print 2020',['linocut']];
imgdict['hotienar.jpeg'] = ['Hot Ienar, linoleum block print 2020',['linocut']];
imgdict['duckling.jpeg'] = ['Duckling, linoleum block print 2020',['linocut']];
imgdict['houseshowsoup.png'] = ['House Show Soup, pen on paper 2020',['drawing']];
imgdict['tulip.jpg'] = ['Tulip, commissioned linoelum block print with watercolor 2019',['watercolor', 'linocut']];
imgdict['violin.jpeg'] = ['Violin, linoleum block print 2019',['linocut']];
imgdict['puzzletree.jpg'] = ['Puzzle Tree, linoleum block print 2019',['linocut']];
imgdict['birdincage.jpg'] = ['Bird in Cage, multi layer linoleum block print 2019',['linocut']];
imgdict['monarch.jpeg'] = ['Monarch, multi layer linoleum block print 2019',['linocut']];
imgdict['timh stained.png'] = ['Talmud is My Home/Aleph Bet Shtetl, micron marker and watercolor 2019',['watercolor']];
imgdict['canarycover.jpeg'] = ['Canaries Escaping the Mine, commissioned multi layer linoleum block print, 2019',['linocut']];
imgdict['partingthesea.jpeg'] = ['Parting the Sea, commissioned watercolor 2019',['watercolor']];
imgdict['garlic.jpg'] = ['Garlic, linoleum block print 2018'];
imgdict['glacier.jpg'] = ['Glacier, watercolor on paper 2018'];
imgdict['fish.jpg'] = ['Fish, linoleum block print 2018'];
imgdict['tagalong.jpg'] = ['Tagalong, watercolor on paper 2018'];
imgdict['papaya.jpg'] = ['Papaya, watercolor on paper 2018'];
imgdict['heart.jpg'] = ['Heart, watercolor on paper 2018'];
imgdict['selfieincar.jpg'] = ['Selfie in Car, linoleum block print 2018'];
imgdict['dogs-manybest.jpeg'] = ['Four Dogs, linoleum block print 2018'];
imgdict['frenchhorn.jpeg'] = ['French Horn, linoleum block print 2018'];
imgdict['shiracats.jpeg'] = ['Two Cats, commissioned linoleum block print and watercolor on paper 2017'];
imgdict['rosetta.jpeg'] = ['Rosetta, linoleum block print 2017'];
imgdict['reader-zhiyin.jpeg'] = ['The Reader, commissioned linoleum block print and watercolor on paper 2017'];
imgdict['inker.jpeg'] = ['The Inker, linoleum block print 2017'];
imgdict['drinker.jpeg'] = ['The Drinker, linoleum block print 2017'];
imgdict['stinker.jpeg'] = ['The Stinker, linoleum block print 2017'];
imgdict['sinker.jpeg'] = ['The Sinker, linoleum block print 2017'];
imgdict['guardingthelight.jpeg'] = ['Guarding the Light, linoleum block print 2017'];
imgdict['linobike.jpeg'] = ['Bike, linoleum block print 2017'];
imgdict['linopogo.jpeg'] = ['Linocat, linoleum block print 2017'];
imgdict['linobass.jpeg'] = ['Bass/Cello, linoleum block print 2017'];
imgdict['linopiano.jpeg'] = ['Piano, linoleum block print 2017'];
imgdict['linoukulele.jpeg'] = ['Ukulele, linoleum block print 2017'];
imgdict['linogotyourback.jpeg'] = ['Got Your Back, linoleum block print 2017'];
imgdict['linoface.jpeg'] = ['Shadowy Face, linoleum block print 2017'];
imgdict['catinabox.jpeg'] = ['Cat in a Box, pencil on paper 2017'];
imgdict['pokemongo.jpg'] = ['Pokemongo, watercolor on paper 2016'];
imgdict['parachute.jpg'] = ['Parachute, watercolor on paper 2016'];
imgdict['green_sky.jpg'] = ['Green Sky, watercolor 2016',['watercolor']];
imgdict['twisty_tree.jpg'] = ['Twisty Tree, watercolor on paper 2016'];
imgdict['seattleskyline.jpg'] = ['Seattle Skyline, acrylic on wood 2012'];
imgdict['duck.jpg'] = ['Duck, acrylic on wood 2012'];
imgdict['huanggua.jpg'] = ['Feeding Huanggua, Div 3 portrait series, watercolor on paper 2011'];
imgdict['nanjinglu.jpg'] = ['Nanjing Lu, Div 3 portrait series, watercolor on paper 2011'];
imgdict['moped.jpg'] = ['Phonecall on a moped by the ATM, Div 3 portrait series, watercolor on paper 2011'];
imgdict['moroccanman.jpg'] = ['Moroccan Man, for portraiture class, watercolor on paper 2011'];
imgdict['hula.jpg'] = ['Hula Teacher on the Beach, watercolor on paper, Kauai, 2006'];
imgdict['sunflowers.jpeg'] = ['Sunflowers, acrylic on cardboard 2006'];
imgdict['nude.JPG'] = ['Nude, chalk pastel on paper 2006'];
imgdict['citycold.JPG'] = ['Cold City, watercolor on paper 2004'];
imgdict['arboretum.jpeg'] = ['Boston Arboretum, watercolor on paper 2003'];
imgdict['stormybeach.jpeg'] = ['Stormy Beach, watercolor on paper 2003'];
imgdict['wintersunset.JPG'] = ['Winter Sunset, watercolor on paper 2003'];

/* list of amibgrams for checking for rotation icon in figure */
var ambigrams = ['merryxmas4.png','hbd-2.png','thankyou-ambi.png','hbd-ambi.png'];

// function to get img captions and other info
/*function getVals(element) {
	var imgsrc = $(this).attr('src').substring(9);
    var caption = imgdict[imgsrc][0];
    var isambi = $.inArray(imgsrc, ambigrams);
}*/


// function to display clicked-on image large with caption or just display caption for small screens
	$('#img-grid img').click(function(){
		// get img src and related caption
		var imgsrc = $(this).attr('src').substring(9);
        var caption = imgdict[imgsrc][0];
        // check if this is an ambigram 
        var isambi = $.inArray(imgsrc, ambigrams);
        //show/hide arrow icon on the figure, remove rotated class/reset icon on figure if present accordingly
        if (isambi == -1) {
        	$('#bigarrow').css('display','none');
        } else {
        	$('#bigarrow').css('display','block');
        }
        // depopulate big caption if relevant 
        $('#bigimg figcaption').text('');
        // find out if smallcaption is already visible on this img, if not we'll show it
        var already = $(this).next().text();
        if (!already) {
        	// first disappear any previous smallcaption divs and depopulate captions
        	$('#img-grid div div').text('');
        	$('#img-grid div div').css('display','none');
	        // populate caption/zoomin div or smallfigcaption with appropriate content for this image
	        $('#bigimg figcaption').text(caption);
	        $(this).next().text(caption);
	        //for screens > 400px, display closeup/figure element and populate the img src with appropriate image
	        // (should be prevented via css for larger screens)
	        $('#bigimg>img').attr('src','./images/'+imgsrc);
	        $('#closeup').toggle();
	        // for smaller screens, show smallcaption div for this image
        	$(this).next().css('display','inline-block')
    	} else {
    		// otherwise disappear smallcaption(s) (all of them for good measure) and depopulate captions
    		$('#bigimg figcaption').text('');
    		$('#img-grid div div').text('');
        	$('#img-grid div div').css('display','none');
    	}

    });

// Reset figure on close
  $('#closeup, #bigimg, #figclose').click(function(e) {
  	// DON'T do this function if a child element was clicked (eg the img, caption, or rotator arrow)
  		if(e.target !== e.currentTarget) return;
  	// otherwise continue
  	  // bg
	    $('#closeup').toggle();
	  // figure caption
	    $('#bigimg figcaption').text('');
	  // little caption for good measure  
	    $('#img-grid div div').text('');
	    $('#img-grid div div').css('display','none');
      // big img
		$('#bigimg img').removeClass('rotated');
		$('#bigimg img').addClass('reset');
		// icon
		$('#bigarrow').addClass('orig');
		$('#bigarrow').html('&#10227;');

  });

// Make grid images rotate when rotator icon is clicked, and toggle orientation of icon
	$('#img-grid .ambi').click(function() {
		var icon = $(this);
		var img = icon.next();
		var imgsrc = img.attr('src').substring(9);
		console.log(imgsrc);
		if ( icon.hasClass('orig')) {
			/* toggle icon */
			icon.removeClass('orig');
			icon.html('&#10226;');
			/* rotate imgs */
			img.removeClass('reset');
			img.addClass('rotated');

		} else {
			/* toggle back icon */
			icon.addClass('orig');
			icon.html('&#10227;');
			/* rotate img back */
			img.removeClass('rotated');
			img.addClass('reset');
		}		
	});

// Make figure img rotate when bigarrow rotator icon is clicked, as above 
	$('#bigarrow').click(function() {
		var icon = $(this);
		var img = icon.next();
		var imgsrc = img.attr('src').substring(9);
		console.log(imgsrc);
		if ( icon.hasClass('orig')) {
			/* toggle icon */
			icon.removeClass('orig');
			icon.html('&#10226;');
			/* rotate imgs */
			img.removeClass('reset');
			img.addClass('rotated');

		} else {
			/* toggle back icon */
			icon.addClass('orig');
			icon.html('&#10227;');
			/* rotate img back */
			img.removeClass('rotated');
			img.addClass('reset');
		}		
	})

});
