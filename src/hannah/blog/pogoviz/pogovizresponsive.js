//////////////////////////////////////////////////////////////////
// Control look and function of photos, slider, table, and charts
//////////////////////////////////////////////////////////////////
'use strict';
///////// CAROUSEL //////////
function showthings(which, direction){
  if (which=='dryfood'){var next='wetfood';var last='photos';}
  if (which=='wetfood'){var next='photos';var last='dryfood';}
  if (which=='photos'){var next='dryfood';var last='wetfood';}
  var offset='200%';
// make sure objects and lists are in appropriate left positions
  $('li.'+next+', .object.'+next).css('left',offset);
  $('li.'+last+', .object.'+last).css('left','-'+offset);
  $('li.'+which+', .object.'+which).css('left',0);
// set vars for which class of element to show next and which direction to move it
  if (direction=='right'){var amt='-'+offset;var replacer=next;var uninvolved=last;}
  if (direction=='left'){var amt=offset;var replacer=last;var uninvolved=next;}
// set uninvolved display properties to none so they don't take up vertical space
  $('li.'+uninvolved+', .object.'+uninvolved).css('display','none');
// move the current ones in the specified direction off the screen
  $('li.'+which+', .object.'+which).animate({left: amt}), 500;
// move the upcoming ones in from the correct direction onto the screen
  setTimeout(function(){$('li.'+replacer+', .object.'+replacer).css('display','inline-block').animate({left:0}), 600;},200);
// squish things when other things should be visible
  if (replacer=='photos'){$('.charts').css('height',0)}else{$('.charts').css('height','100%')};
  if (replacer=='wetfood'){$('#dryfood').css('display','none')}else{$('#dryfood').css('display','inline-block')};
}

function smallscreen(windowwidth, windowheight){
// make room above the main div for the carousel
  $('.maindiv').css('height',windowheight-100).css('margin-top','100px').css('width','100%');
// set max image height
  $('img').css('max-height',0.95*(windowheight-100));
// show correct object based on which list item is currently visible
  if ($('li.dryfood').css('display')!='none' & $('li.dryfood').css('left')=='0px') {
    $('.wetfood, .photos').css('display','none');
  }
  if ($('li.wetfood').css('display')!='none' & $('li.wetfood').css('left')=='0px') {
    $('.dryfood, .photos').css('display','none');
  }
  if ($('li.photos').css('display')!='none' & $('li.photos').css('left')=='0px') {
    $('.charts').css('height',0);$('.dryfood, .wetfood').css('display','none');
  }
// if right/left arrows/words are clicked, do function to scroll appropriately through list items and objects
  $('li>i.fa-arrow-right, .next').click(function(){
    var which = $(this).parent().attr('class');
    showthings(which,'right');
  });
  $('li>i.fa-arrow-left, .last').click(function(){
    var which = $(this).parent().attr('class');
    showthings(which,'left');
  });
}

///////// DIMENSIONS //////////
// change height of main div to accomodate carousel slider when screen is small and trigger carousel fxn
  function maindiv(){
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    var windowheight=$(window).height();
    var keyheight = document.getElementById('key').offsetHeight;
    if (windowwidth<600) {
      smallscreen(windowwidth, windowheight);
    } else {
      if (windowheight<500){
        $('img').css('max-height',500);
        $('body').css('overflow-y','auto');
      } else {
        $('.maindiv').css('height','100%').css('margin-top',0).css('width','100%');
        $('.charts').css('height','100%')
        $('#dryfood, #wetfood, #photoslider').css('display','inline-block').css('left',0);
        $('#photoslider').css('height',windowheight-keyheight).css('left',0);
        $('body').css('overflow-y','hidden');
      }
    }  
  }
  $(window).on('resize load', maindiv);
  maindiv(); 

///////// PHOTO SLIDER //////////
// f(date): show the slide we're on, hide all others, and do function to get margins for this one so it's centered
  function showDivs(date, error) {
    $('img').css('opacity',0);
    /*var x = document.getElementsByTagName("img");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.opacity = 0;
    }*/
    var date=date;
    try{
      var today = document.getElementById(date);
      today.style.opacity = 1;
      get_margins(date);
      $(window).resize(function() {
        get_margins(date);
      });
    } 
    catch(error) {
      console.log(error);
    }
  }

// f(date): get margins for photos
  function get_margins(when) {
  // get dims of various elements
    var today=document.getElementById(when);
    //var keyheight = document.getElementById('keytable').offsetHeight;
    var photosliderwidth = document.getElementById('photoslider').offsetWidth;
    var photosliderheight = document.getElementById('photoslider').offsetHeight;
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    var windowheight=$('window').height();
    
  // find out how big image is and how big leftover screen is
    var imgwidth = today.offsetWidth;
    if (imgwidth == 0) { // wait for image to load before setting margins
      setTimeout(function(){
          //console.log('waiting for image to load');
          showDivs(when);
      }, 200);
    }
    var side = (photosliderwidth - imgwidth)/2;
    if (windowheight<500 & windowwidth>599) {var top=10}
    else {
      var imgheight = today.offsetHeight;
      var top=(photosliderheight - imgheight)/2
    }
  // set margins to center the image according to how much screen is leftover
    //today.style.setProperty('margin-left', margin_side + 'px', 'important');
    //today.style.setProperty('margin-top', margin_top + 'px', 'important');
    today.style.left = side+'px';
    today.style.top = top+'px';
  }


///////// CHART-SLIDER INTERACTIONS AND SET UP FOR CHARTS ///////////
// format date
  var dtgFormat = d3.time.format("%m/%d/%y");

// Create the dc.js chart objects & link to div
  var dryfood = dc.lineChart("#dryfood");
  var wetfood = dc.lineChart("#wetfood");
  var key = d3.select("#key");
  var charts = $('#charts');

// Define margins
  function getdims() {
    var windowwidth=window.innerWidth || 
    document.documentElement.clientWidth || 
    document.body.clientWidth;
    if (windowwidth<600){
      var divisor=1;
      var overallwidth = $('.maindiv').width();
    }else{
      var divisor=2;
      //var overallwidth =charts.width();
      var overallwidth = $('.maindiv').width()/2;
    }
    var margin = {top: 10, right: -30, bottom: 20, left: 0},
    width =  overallwidth - margin.left - margin.right,
    height = ($('.maindiv').height() - divisor*margin.top - divisor*margin.bottom)/divisor;
    return [width,height];
  }

// load data from csv file
  d3.csv("../d3pogodata.csv", function(data) {

// determine number of pixels on date scrollbar that correspond to a day based on number of dates in data (only changes when data are updated)  
    var counts = 0;
    var startdate;
    var enddate;
    data.forEach(function(d) { 
      counts +=1
      d.date   = dtgFormat.parse(d.date);
      d.dry   = +d.dry;
      d.wet  = +d.wet;
      if (counts == 1){startdate=d.date;}
      enddate=d.date;
      return {counts:counts, startdate:startdate, enddate:enddate};
    })
    function dailypixels() {
      return ($('#datescrollbar').width()-3)/counts; // -3 so it will refer to middle of handle
    }

  // Set start conditions
    datecascade(getdate(0));

  // f(date): get both wet and dry values for a given date and announce it in the "selected" area
    function getvals(selected) { // takes a value of date formatted like "11/30/16"
      var date = selected;
      data.forEach(function(x) {
        x.date = x.date;
        if (dtgFormat(x.date) == date) {
          var thisdry = x.dry;
          var thiswet = x.wet;
          $('.selected').text(" " + date + " - " + thisdry + "T, " + thiswet + "Oz");
        }
      });
    };
 
  // f(mouse position): move handle to a daily-unit along scrollbar approximating mouse position when scrollbar is clicked  
    function getleft(n) {return Math.round(n / dailypixels()) * dailypixels();}
    
  // f(mouse position): determine num days since start date that correspond with mouse position, return that date
    function getdate(x) {
      var startdate=dtgFormat.parse("11/24/16");
      var numdays = x/dailypixels();
      Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
      }
      return dtgFormat(startdate.addDays(numdays));
    }

  // f(date): show divs, getvals and highlight dots when a given date is selected on date scrollbar
    function datecascade(selected) {
      showDivs(selected);
      getvals(selected);
      highlightdots(dtgFormat.parse(selected)); 
    }

  // move handle based on click position on date scrollbar/arrows
    var maxright = $("#datescrollbar").width()-5; // -5 to go to middle of handle - border
    function whereami() {
      var location = event.pageX - $("#datescrollbar").offset().left-3; // -3 so it goes to middle of handle
      if (location<0) {var location=0};
      if (location>maxright) {var location=maxright};
      return location;
    } 
    function gethandle() {return $('#handle').offset().left - $("#datescrollbar").offset().left;}

  //if the scroll bar is clicked, move handle to closest daily-pixels unit by mouse position
    $("#datescrollbar").click(function() {
        $('#handle').css('margin-left',getleft(whereami()));
    });
  //if the left scroller is clicked and there is room to go down, move handle from its current position down one day
    $("#leftscroller").click(function() {
      if (gethandle() >=dailypixels()) {$('#handle').css('margin-left',getleft(gethandle() - dailypixels()));}
    });    
  //if the right scroller is clicked and there is room to go up, move handle from its current position up one day
    $("#rightscroller").click(function() {
      if (gethandle() <= maxright) {$('#handle').css('margin-left',getleft(gethandle() + dailypixels()));} 
    });
  // report date and show divs etc based on where handle now is    
    $('#scrollability').click(function(){datecascade(getdate(gethandle()));});

  // handle click-and-drag functionality
    var clicking = false;
    $('#datescrollbar').mousedown(function(){clicking = true;});
    $(document).mouseup(function(){clicking = false;})
    $('#datescrollbar').mousemove(function(){
    // hoverover - show date in hover field
      if (clicking==false) {
        $('.hovered').text(" "+getdate(getleft(whereami())));
        $('#datescrollbar').mouseout(function() {
          $('.hovered').text("");
        });
    // clicked - move handle with mouse, show date in hover field, date and data in selected filed, appropriate photo for date
      } else {
        $('#handle').css('margin-left',getleft(whereami())); 
        $('.hovered').text(" "+getdate(getleft(whereami())));
        datecascade(getdate(getleft(whereami())));
      }
    });

  // f(dates): set where handle should be positioned based on date selection in charts
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    }
    function sethandle(date) {$('#handle').css('margin-left',daysBetween("11/24/16",date) * dailypixels());}

  // f(date): highlight appropriate dots when handle moves
    function highlightdots(date) {
      var thisdate=date;
      wetfood.selectAll('circle.dot').attr('r',3.5).style('fill-opacity', 0.4).style('stroke-opacity', 0.4).attr('clicked','no');
      dryfood.selectAll('circle.dot').attr('r',3.5).style('fill-opacity', 0.4).style('stroke-opacity', 0.4).attr('clicked','no');
      wetfood.selectAll('circle.dot').filter(function(d) { return d.data.key.getTime() === thisdate.getTime(); }).attr('r',5).style('fill-opacity', 1).style('stroke-opacity', 1).attr('clicked','yes');
      dryfood.selectAll('circle.dot').filter(function(d) { return d.data.key.getTime() === thisdate.getTime(); }).attr('r',5).style('fill-opacity', 1).style('stroke-opacity', 1).attr('clicked','yes'); 
    }


///////// MAKE CHARTS ///////////
  // Determine dimensions of charts and margins (made it a function at one point when trying to make page responsive but changed mind for now)
    /*function getdims() {return{width:435,height:220};};
    var top=10, right=10, bottom=20, left=30;*/

  // Run the data through crossfilter and load our 'facts'
    var facts = crossfilter(data);

  // Line charts by day
    var byday = facts.dimension(function(d) {
      return d.date;
    });
    var drygroup = byday.group()
      .reduceSum(function(d) { return d.dry; });
    var wetgroup = byday.group()
      .reduceSum(function(d) { return d.wet; });

  // dry graph
    dryfood
      .dimension(byday)
      .group(drygroup)
      .transitionDuration(500)
      .elasticY(true)
      .brushOn(false)
      .title(function(){return;})
      .on('renderlet', function(chart) {
        chart.svg().select('.chart-body').attr('clip-path',null);
        chart.svg().selectAll('circle.dot')
        .attr('r',3.5).style('fill-opacity',0.4).style('stroke-opacity',0.4).attr('fill','black')
        .on('mousemove',function(d){
            d3.select(this).style('fill-opacity', 1).style('stroke-opacity', 1).attr('r',5);
            key.select('.hovered').text(" " + dtgFormat(d.data.key) + ' - ' + d.data.value + 'T');
          })
        .on('click', function(d) {
            var thisdate=d.data.key;
            highlightdots(thisdate);
            sethandle(dtgFormat(thisdate));
            getvals(dtgFormat(thisdate));
            showDivs(dtgFormat(thisdate));
        })
        .on('mouseout', function(){
            var dot=d3.select(this);
            if (dot.attr('clicked') != 'yes') {dot.style('fill-opacity', 0.4).style('stroke-opacity', 0.4).attr('r',3.5);}
            key.select('.hovered').text("");
        })    
      })
      .x(d3.time.scale().domain(d3.extent(data, function(d) { return d.date; })))
      .xAxis().ticks(4);

  // wet graph
    wetfood
      .dimension(byday)
      .group(wetgroup)
      .transitionDuration(500)
      .elasticY(true)
      .brushOn(false)
      .title(function(){return;})
      .on('renderlet', function(chart) {
        chart.svg().select('.chart-body').attr('clip-path',null);
        chart.svg().selectAll('circle.dot')
        .attr('r',3.5).style('fill-opacity',0.4).style('stroke-opacity',0.4).attr('fill','black')
        .on('mousemove',function(d){
            d3.select(this).style('fill-opacity', 1).style('stroke-opacity', 1).attr('r',5);
            key.select('.hovered').text(" " + dtgFormat(d.data.key) + ' - ' + d.data.value + 'Oz')
          })
        .on('click', function(d) {
            var thisdate=d.data.key;
            highlightdots(thisdate);
            sethandle(dtgFormat(thisdate));
            getvals(dtgFormat(thisdate));
            showDivs(dtgFormat(thisdate));
        })
        .on('mouseout', function(d){
            var dot=d3.select(this);
            if (dot.attr('clicked') != 'yes') {dot.style('fill-opacity', 0.4).style('stroke-opacity', 0.4).attr('r',3.5);}
            key.select('.hovered').text("");
        })    
      })
      .x(d3.time.scale().domain(d3.extent(data, function(d) { return d.date; })))
      .xAxis().ticks(4); 

// Render charts on load or resize, w adjusted dimensions on resize
    function resize() {
      var width=getdims()[0];
      var height=getdims()[1];
      dryfood.width(width).height(height);
      wetfood.width(width).height(height);
      dc.renderAll();
    };
    $(window).on('resize load', resize);
    resize(); 
  
});
  