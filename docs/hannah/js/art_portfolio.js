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
  $('#filterby').change(function() {showthumbs();}); // and when the filter changes
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
// Function to load images lazily ie only as they are called in the slideshow: this is the default
  lazyslides = function() {
      var img = $('#slideshow').find("img:visible");
      if (!img.data("shown")) {
          var dataSrc = img.data("src");
          img.attr("src", dataSrc);
          img.data("shown", true);
      }
      if (!img.hasClass('shown')) {img.addClass('shown');}
  }

/*// With option of using button to PRELOAD images so slideshow goes more smoothly, if one wants
  checkcount = function() {return $('#slideshow img.shown').length;}
  var imgs= $('#slideshow img');
  preload = function() {
    // make preloading button unclickable once clicked
    $('.preloading').html('preloaded').css('pointer-events', 'none').addClass('done');
    // find denominator
    var total = imgs.length;
    // loop over images, replacing dummy img w real img and adding shown class
    // then updating preloaded tally
    $.each(imgs, function() {
        if (!$(this).hasClass('shown')) {
          var dataSrc = $(this).data('src');
          $(this).attr('src', dataSrc);
          $(this).on('load', function() {
            $(this).addClass('shown');
            $('.explanation').html(checkcount() + '/' + total + ' images');
          });
        }
    });
  }
  $('.preloading').click(function() {preload();})
*/

// Open and close slideshow at the correct image when various elements are clicked
  $('#grid div').click(function() {
    var allselected = checkfilter()[0];
    //var index = $( "#grid div" ).index(this);
    var index = allselected.index(this);
    showDivs(index+1);
    document.getElementById("slideshow").style.display = "block";
    lazyslides();
  });
  $('.topband, .bottomband, .closebtn').click(function() {
    document.getElementById("slideshow").style.display = "none";
  });


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



// Increment up or down slides
  var slideIndex;
  var x;
  function plusDivs(n) {
    showDivs(slideIndex +=n);
  }

// Show the slide we're on, hide all others
  function showDivs(n) {
    var i;
    slideIndex = n;
    var x = checkfilter()[1];
    if (n > x.length) {slideIndex = n % x.length}
    if (n < 1) {slideIndex = x.length};
    $('figure').css('display','none');
    x[slideIndex-1].style.display = "block";
    lazyslides();
    if (checkfilter()[2] != "All") {
      $('#slidefilter').css('display','inline-block');
      $('#tellme').html('Filtered by: '+checkfilter()[2]);
    }
    else {
      $('#slidefilter').css('display','none');
      $('#tellme').html("");
    }
  }

});





