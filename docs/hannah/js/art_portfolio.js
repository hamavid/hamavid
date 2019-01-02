$(document).ready(function(){

// Show/hide back-to-top button
  $(window).bind('resize scroll', showhide_backtotop);
  function showhide_backtotop() {
    var howfar = $(window).scrollTop();
    /*if (document.body.scrollTop > 200) {*/
    if (howfar>200) {
        $('.backtotop').css('display','block');
    } else {
        $('.backtotop').css('display','none');
    }
  }


/* ------------ FILTERING ---------------*/
// fxn to determine which filter has been selected and return the subset of grid and slide images that fit the selection
// for use in showing/scrolling through divs for slideshow 
  function checkfilter() {
      var filteredon = $('#filterby option:selected').text();
      var filter_ID = $('#filterby').val();
      if (filter_ID == "all") {
        thumbs = $('#grid').find('div');
        slides = $('#slideshow').find('figure');
      } else {
        thumbs = $('#grid').find('.'+filter_ID);
        slides = $('#slideshow').find('figure.'+filter_ID);
      }
      return [thumbs,slides,filteredon];
  }


 
/* ---------- THUMBNAILS -------------- */
 // function to show all thumbs that fit the selected filter (w dummy image)
  showthumbs(); // do this on page load
  $('#filterby').change(function() {showthumbs();lazythumbs();}); // and when the filter changes
  function showthumbs() {
    var thumbs = checkfilter()[0];
    $('#grid>span>div').hide();
    thumbs.fadeIn(200);
  }

  // lazy load actual images for thumbs as user scrolls down
  $(window).on('load scroll', function() {lazythumbs();});
  lazythumbs = function() {
    var visthumbs = $('#grid').find("div:visible");
    visthumbs.each(function() {
      if ($(window).scrollTop() + $(window).height() >= $(this).offset().top) {
        var imgsrc = $(this).data('src');
        $(this).css('background-image', 'url(' + imgsrc + ')');
      } 
    });    
  }


/* ----------- SLIDESHOW ----------- */
// Load a given slide image (as opposed to the blank dummy image)
  lazyslides = function(index) {
      var img = checkfilter()[1].eq(index).find('img');
      if (!img.data("shown")) {
          var dataSrc = img.data("src");
          img.attr("src", dataSrc);
          img.data("shown", true);
      }
      if (!img.hasClass('shown')) {img.addClass('shown');}
  }

// Function to start loading images to left and right of the current slide and continue outwards
  symmetry = function(index) {
    for (i=1; i<(checkfilter()[1].length+1)/2; i++) {
      if (i==1) {var down = index;} else{var down = (index-i+checkfilter()[1].length) % checkfilter()[1].length;}
      var up = (index+i) % checkfilter()[1].length;
      checkfilter()[1].eq(down).find('img').one('load', function() {
        lazyslides(down);
      })
      .each(function () {
        if(this.complete) $(this).trigger('load');
      });
      checkfilter()[1].eq(up).find('img').one('load', function() {
        lazyslides(up);
      })
      .each(function () {
        if(this.complete) $(this).trigger('load');
      });
    }
  }


// Open and close slideshow at the correct image when various elements are clicked
  $('#grid div').click(function() {
    showDivs(checkfilter()[0].index(this)+1);
    // set off function to load actual images to left and right of this slide
    symmetry(checkfilter()[0].index(this));
  });
  $('.topband, .bottomband, .closebtn').click(function() {
    document.getElementById("slideshow").style.display = "none";
  });


// Increment up or down slides
  var slideIndex;
  var x;
  function plusDivs(n) {
    showDivs(slideIndex +=n);
  }

// Show the slide we're on, hide all others
  function showDivs(n) {
  // determine which slide toshow
    var i;
    slideIndex = n;
    var x = checkfilter()[1];
    if (n > x.length) {slideIndex = n % x.length}
    if (n < 1) {slideIndex = x.length};
  // show/hide relevant elements
    $('#slideshow').css('display','block'); //show slideshow
    $('figure').css('display','none'); // hide all figures
    x[slideIndex-1].style.display = "block"; // just show the one we want to show
    lazyslides(slideIndex-1); // load the actual image for this slide if needed
  // fill in filter information
    if (checkfilter()[2] != "All") {
      $('#slidefilter').css('display','inline-block');
      $('#tellme').html('Filtered by: '+checkfilter()[2]);
    }
    else {
      $('#slidefilter').css('display','none');
      $('#tellme').html("");
    }
  }


// extract window width and set overlay width accordingly depending on sidebar visibility
  function set_overlay_width() {
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    //var windowheight=document.documentElement.clientHeight;
    //var scrollheight=document.documentElement.scrollHeight;
    /* subtracting 15 for scroll bar (17 was somehow too much) */
    if (windowwidth>992) {
      $('.overlay-content').css('width',windowwidth-180);
    } else {
      $('.overlay-content').css('width',windowwidth);
    }  
  }
  $(window).bind('resize',set_overlay_width); 
  set_overlay_width();


// highlight left and right scroll arrows when hovering on diff areas of screen
  $('#leftside').mouseenter(function(){$('.leftscroller').css('opacity','1');});
  $('#leftside').mouseleave(function(){$('.leftscroller').css('opacity','0.3');});
  $('#rightside').mouseenter(function(){$('.rightscroller').css('opacity','1');});
  $('#rightside').mouseleave(function(){$('.rightscroller').css('opacity','0.3');});

// Scroll right or left when various elements are clicked
  $('.leftscroller, #leftside').click(function() {plusDivs(-1);});
  $('.rightscroller, #rightside').click(function() {plusDivs(+1);});

// Swipability  
    $('.overlay-content').touchwipe({
      wipeLeft: function() {plusDivs(+1);;},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
    $('.overlay-content').touchwipe({
      wipeRight: function() {plusDivs(-1);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });


// Make the figcaption and filter info dis/appear on click and toggle the up/down arrow accordingly
  // figcaption
    $('figcaption').click(function() {
    // hides all captions unless the .each() wrapper is commented out, then hides only clicked-on caption
      $('figure').each(function() {
        $(this).find('i:first').toggleClass("fa-angle-double-down fa-angle-double-up");
        $(this).find('span:first').slideToggle();
      });
    });
  // filter info 
    $('#slidefilter').click(function() {
      $('#slidefilter i').toggleClass("fa-angle-double-down fa-angle-double-up");
      $('#tellme').slideToggle();
    });

});





