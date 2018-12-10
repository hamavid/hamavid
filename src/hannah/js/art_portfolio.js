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

// Enable filtering - dropdown select and show only selected imgs in grid
  $('.dropbtn').click(function() {$('#filter').slideToggle();});
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn, #filter, i') && $('#filter').css('display') == 'block') {
      $('#filter').slideToggle();
      pagination();
    }
  }
  $('#filter>li').click(function() {
    selected_descrip = $(this).html();
    selected_ID = $(this).attr('id');
    $('#selected-filter').html(selected_descrip);
    if (selected_ID != "all") {
      $('#grid>span>div').hide();
      $('.'+selected_ID).fadeIn(200);
    } else {
      $('#grid>span>div').hide();
      $('#grid>span>div').fadeIn(200);
    }
  });

// determine which filter has been selected and return the subset of grid and slide images that fit the selection
// for use in showing/scrolling through divs for slideshow
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


//Pagination
  // num pix to show per page, find out num pix in this filter, calc num pages
  //pagination();
  function pagination() {
    totalpix = checkfilter()[0].length;
    console.log(totalpix);
  }
 /* pageSize = ;

  var pageCount =  $(".line-content").length / pageSize;
    
     for(var i = 0 ; i<pageCount;i++){
        
       $("#pagin").append('<li><a href="#">'+(i+1)+'</a></li> ');
     }
        $("#pagin li").first().find("a").addClass("current")
    showPage = function(page) {
      $(".line-content").hide();
      $(".line-content").each(function(n) {
          if (n >= pageSize * (page - 1) && n < pageSize * page)
              $(this).show();
      });        
  }
    
  showPage(1);

  $("#pagin li a").click(function() {
      $("#pagin li a").removeClass("current");
      $(this).addClass("current");
      showPage(parseInt($(this).text())) 
  });
*/

// Open and close slideshow at the correct image when various elements are clicked
  $('#grid div').click(function() {
    var allselected = checkfilter()[0];
    //var index = $( "#grid div" ).index(this);
    var index = allselected.index(this);
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

// SWIPE  
    $('.overlay-content').touchwipe({
      wipeLeft: function() {plusDivs(+1);;},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
    $('.overlay-content').touchwipe({
      wipeRight: function() {plusDivs(-1);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });

// Make the figcaption dis/appear on click and toggle the up/down arrow accordingly
  $('figcaption').click(function() {
// hides all captions unless the .each() wrapper is commented out, then hides only clicked-on caption
    $( 'figure' ).each(function() {
      $(this).find('i:first').toggleClass("fa-angle-double-down fa-angle-double-up");
      //if ( $(this).find('div:first').text() == "") { $(this).find('div:first').text(" (Show caption)")}
      //else {$(this).find('div:first').text("")}
      $(this).find('span:first').slideToggle();
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
    //x = document.getElementsByTagName("figure");
    var x = checkfilter()[1];
    if (n > x.length) {slideIndex = n % x.length}
    if (n < 1) {slideIndex = x.length};
    /*for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }*/
    $('figure').css('display','none');
    x[slideIndex-1].style.display = "block";
    if (checkfilter()[2] != "All") {$('#slidefilter').html('Filtered by: '+checkfilter()[2]);} else {$('#slidefilter').html("");}
  }

});





