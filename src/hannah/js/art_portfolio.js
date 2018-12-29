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

// Default to fewer thumbs on mobile, more on desktop
/*  // commenting out for now in favor of NON responsive one
  // so it doesn't throw people off if they've picked a non default page size
  //$(window).bind('resize', chng_default_pagesize); 
  function chng_default_pagesize() {
    if ($(window).width() < 433) {$('#pagesize').val('8');}
    else {$('#pagesize').val('16');}
    showpage(1);
  }*/
  if ($(window).width() < 433) {$('#pagesize').val('8');}


/* ------------ FILTERING ---------------*/
// dropdown select to specify which imgs should show in grid
// to add?: only load full images src for selected filter
  $('.dropbtn').click(function() {$('#filter').slideToggle();});
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn, #filter, i') && $('#filter').css('display') == 'block') {
      $('#filter').slideToggle();
      //showpage(1); // start on the first page of this filter - commented out cause no longer doing pagination
      showall();alllazythumbs(); // doing this instead
      $('.pagetoggle>.fa-angle-left').addClass('arrowdim'); // make sure left arrow is dim
    }
  }
  $('#filter>li').click(function() {
    selected_descrip = $(this).html();
    selected_ID = $(this).attr('id');
    $('#selected-filter').html(selected_descrip);
    if (selected_ID != "all") {
      $('#grid>span>div').hide();
      $('.'+selected_ID).fadeIn(200);
      $('#slidefilter, #tellme').css('display','inline-block');
      $('#preload, .preloading, .explanation').css('display','none');
      $('#slidefilter i').removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
    } else {
      $('#grid>span>div').hide();
      $('#grid>span>div').fadeIn(200);
      $('#slidefilter').css('display','none');
      $('#preload, .preloading, .explanation').css('display','inline-block');
      $('#preload i').removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
    }
  });

// fxn to determine which filter has been selected and return the subset of grid and slide images that fit the selection
// for use in showing/scrolling through divs for slideshow and to inform pagination
  function checkfilter() {
      var filteredon = $('#selected-filter').html();
      var filter_ID = $('#filter').find('li:contains('+filteredon+')').attr('id');
      if (filter_ID == "all") {
        thumbs = $('#grid').find('div');
        slides = $('#slideshow').find('figure');
      } else {
        thumbs = $('#grid').find('.'+filter_ID);
        slides = $('#slideshow').find('figure.'+filter_ID);
      }
      return [thumbs,slides,filteredon];
  }


/* ---------- SHOW THUMBS -------------- */
 // function to supercede the pagination functions below by showing all thumbs (w dummy image) in the filter
  showall();
  function showall() {
    var thumbs = checkfilter()[0];
    thumbs.css('display','inline-block');
  }

  // function to lazy load actual images for thumbs as user scrolls down
  $(window).on('load scroll', function() {alllazythumbs();});
  alllazythumbs = function() {
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

// With option of using button to PRELOAD images so slideshow goes more smoothly, if one wants
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

// Make the figcaption, preload info, and filter info dis/appear on click and toggle the up/down arrow accordingly
  // figcaption
    $('figcaption').click(function() {
    // hides all captions unless the .each() wrapper is commented out, then hides only clicked-on caption
      $('figure').each(function() {
        $(this).find('i:first').toggleClass("fa-angle-double-down fa-angle-double-up");
        $(this).find('span:first').slideToggle();
      });
    });
  // preload info
    $('#preload i').click(function() {
      $('#preload i').toggleClass("fa-angle-double-down fa-angle-double-up");
      $('.preloading, .explanation').slideToggle();
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
      console.log(checkfilter()[2]);
      $('#preload').css('display','none');
      $('#slidefilter').css('display','inline-block');
      $('#tellme').html('Filtered by: '+checkfilter()[2]);
    }
    else {
      $('#slidefilter').css('display','none');
      $('#tellme').html("");
      $('#preload').css('display','inline-block');
    }
  }

/* //////////////// NOW SUPERCEDED BY LAZYLOAD ////////////////// */
/* ------------ PAGINATION ---------------*/
// function to lazy load thumbs based on what's showing on the page
  lazythumbs = function() {
    var visthumbs = $('#grid').find("div:visible");
    visthumbs.each(function() {
      if (!$(this).data("shown")) {
          var tdataSrc = $(this).data("src");
          $(this).css('background-image', 'url(' + tdataSrc + ')');
          $(this).data("shown", true);
      }
    });    
  }

// pagesizereset button dimming/undimming fxns
  function buttonundim() {if ($('#pagesize').val().length > 0) {$('.pagesizereset').removeClass('buttondim');}}
  function buttondim() {$('.pagesizereset').addClass('buttondim');}

// UNdim pagesizereset button if number in input box changes (and has usable content)
    $('#pagesize').on('change keyup', function() {
    // Get last typed character so we can check that it's not a  space
      var lastChar = String.fromCharCode(this.value.charCodeAt(this.selectionStart - 1));
    // only undim if value is a number AND if (not a space OR if the last thing that happened was to delete text)
      if (!isNaN(this.value) && (lastChar != " " || this.value.length < lastlength)){buttonundim();}
    // dim if there is no input text
      if (this.value.length == 0) {buttondim();}
  });

  // show first thumbs page on page load - commenting out in favor of lazy load
  //showpage(1);

  // go up or down a page when arrows are clicked
  $('.pagetoggle>.fa-angle-left').on('click', function() {pluspage(-1);})
  $('.pagetoggle>.fa-angle-right').on('click', function() {pluspage(+1);})

  // reset number of pix per page when button is clicked and go to first page
  $('.pagesizereset').on('click', function() {buttondim();showpage(1);});

  // Increment up or down a page
  var pagenum;
  var thumbs;
  function pluspage(n) {
    showpage(pagenum +=n);
  }

  // only show thumbs for the selected filter AND selected page. 
  // report what's going on in the pagination element
  function showpage(n) {
    // set vars
    pagenum = n;
    var thumbs = checkfilter()[0];
    var pixperpage = parseInt($('#pagesize').val());
    var startnum = ((pagenum - 1) * pixperpage);

    // make sure all thumbs are hidden, then show only relevant ones
    $('#grid').find('div').css('display','none');
    //$('.pagination>div').css('display','block'); // but show pagination at the bottom
    thumbs.slice(startnum,startnum+pixperpage).css('display','inline-block');
    lazythumbs();

    // Report relevant numbers in the pagination elements and dim/undim arrows as needed
    $('.pagetoggle>.fa-angle-left, .pagetoggle>.fa-angle-right').removeClass('arrowdim'); // undim both arrows
    $('.pagemin').html(startnum+1);
    // dim left arrow if this is the first page
    if (startnum==0) {$('.pagetoggle>.fa-angle-left').addClass('arrowdim');}
    // check if there are any more pages, fill in pagemax and dim right arrow if needed
    if (thumbs.length > startnum+pixperpage){$('.pagemax').html(startnum+pixperpage);} 
    else {
      $('.pagemax').html(thumbs.length);
      $('.pagetoggle>.fa-angle-right').addClass('arrowdim');
    }
    $('.filtertotal').html(thumbs.length);
  }


});





