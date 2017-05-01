$(document).ready(function(){

// Show/hide back-to-top button
  $(window).bind('resize scroll', showhide_backtotop);
  function showhide_backtotop() {
    if (document.body.scrollTop > 200) {
        $('.backtotop').css('display','block');
    } else {
        $('.backtotop').css('display','none');
    }
  }

// Open and close slideshow at the correct image when various elements are clicked
  $('#grid div').click(function() {
    var index = $( "#grid div" ).index( this );
    showDivs(index+1);
    document.getElementById("slideshow").style.display = "block";
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

// Make the figcaption dis/appear on click and toggle the up/down arrow accordingly
  $('figcaption').click(function() {
// hides all captions unless the .each() wrapper is commented out, then hides only clicked-on caption
    $( "figure" ).each(function() {
      $(this).find('i:first').toggleClass("fa-angle-double-down fa-angle-double-up");
      //if ( $(this).find('div:first').text() == "") { $(this).find('div:first').text(" (Show caption)")}
      //else {$(this).find('div:first').text("")}
      $(this).find('span:first').slideToggle();
    });
  });
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
    x = document.getElementsByTagName("figure");
    if (n > x.length) {slideIndex = n % x.length}
    if (n < 1) {slideIndex = x.length};
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
  }


