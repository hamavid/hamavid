$(document).ready(function(){

var showopac = 0.8

// test dimensions of page and return img specs accordingly
    function whichpic() {
        var windowwidth=window.innerWidth || 
        document.documentElement.clientWidth || 
        document.body.clientWidth;
        var windowheight = $(window).height();
      // show tall narrow pic  
        if (windowheight > windowwidth) {
            picwidth = (274/442) * windowheight;
            if (picwidth > windowwidth) {picwidth = windowwidth;} // don't get wider than the window
            if (picwidth > 320) {picwidth = 320;} // don't get wider than 320
            picheight = (442/274) * picwidth;
            picname = "chair";
            picsuffix = "jpg";
      // show short wide pic      
        } else {
            picheight = (582/700) * windowwidth;
            if (picheight > windowheight) {picheight = windowheight;} // don't get taller than the window
            if (picheight > 600) {picheight = 600;} // don't get taller than 600
            picwidth = (700/582) * picheight;
            picname = "hug";
            picsuffix = "jpeg";
        }
        return [picwidth, picheight, picname, windowwidth, windowheight, picsuffix]
    }

// set figure/img properties based on screen height/width 
	function reset_dims_opac() {
    // determine window dimensions
        picwidth = whichpic()[0];
        picheight = whichpic()[1];
        picname = whichpic()[2];
        windowwidth = whichpic()[3];
        windowheight = whichpic()[4];
        picsuffix = whichpic()[5];
    // set which images to show, and their dimensions, based on window dims
        $('figure, img').css('width',picwidth).css('height',picheight);
        $('figure').css('margin-top',(windowheight-picheight)/2);
        $('#default').attr('src','images/'+picname+'.'+picsuffix);
        $('#hl_hannah').attr('src','images/'+picname+'_hannah_hl.'+picsuffix);
        $('#hl_aviva').attr('src','images/'+picname+'_aviva_hl.'+picsuffix);
    // show/hide abouts depending on window dims (didn't figure out a CSS or simpler version alas)
        if ((picwidth<=300 & picname=='chair') || (picheight<=390 & picname=='hug')){
            if (windowwidth >=650 & picname=='hug') {
                if (picheight>=260){$('.about').css('max-height','260px').css('max-width','520px').css('margin','auto');}
                else{$('.about').css('max-height','100%').css('max-width','900px').css('margin','auto');}
            }        
            else{$('.about').css('max-height','100%').css('max-width','100%').css('margin','0');}
            $('.hannahlabel, .avivalabel').css('font-size','14px').css('border','1px solid black');
            $('.smallabout').css('display','block');
            $('.largeabout').css('display','none');
        } else {
            $('.about').css('max-height','80%').css('max-width','70%').css('margin','auto');
            $('.smallabout').css('display','none');
            $('.largeabout').css('display','block');
            $('.hannahlabel, .avivalabel').css('font-size','24px').css('border','2px solid black');
        }
        if (picwidth>=550 & picheight>=460){$('.about').css('max-height','350px').css('max-width','385px')}
        if (picname=='chair'){$('.hannahlabel, .avivalabel').css('margin-top','90%');}
        else{$('.hannahlabel, .avivalabel').css('margin-top','70%');}
    // set number of milliseconds to delay after clicking area (more on mobile)    
        wait=0;
        if (windowwidth < 600) {wait=500;}
	}

 // run the above function when page is loaded or window is resized   
	$(window).on('resize load', reset_dims_opac);
	reset_dims_opac();

// Go to relevant subpages when divs are clicked (with delay in milliseconds)
	$("#aviva_area").on('click', function(){
        setTimeout(function() {window.location = "./aviva";}, wait);
    });
	$("#hannah_area").on('click', function(){
        setTimeout(function() {window.location = "./hannah";}, wait);
    });
    $('#a-overlay>span').on('click', function(){window.location = "./aviva";});
    $('#h-overlay>span').on('click', function(){window.location = "./hannah";});
   

// Bring out overlays on swipe
   /* // double clicking, for testing on no-touch screen
       $('body').on('dblclick', function() {
            if ($('#h-overlay').css('display')=='none' && $('#a-overlay').css('display')=='none') {
                $('#h-overlay').show('slide', {direction: 'right'}, 500);
            }
        });
       $('#h-overlay').on('dblclick', function() {
            $('#h-overlay').hide('slide', {direction: 'right'}, 500);
        });*/
    // SWIPE  
    $('body figure').touchwipe({
      wipeLeft: function() { 
        if ($('#h-overlay').css('display')=='none' && $('#a-overlay').css('display')=='none') {
            $('#h-overlay').show('slide', {direction: 'right'}, 500);
        }
      },
      wipeRight: function() { 
        if ($('#h-overlay').css('display')=='none' && $('#a-overlay').css('display')=='none') {
            $('#a-overlay').show('slide', {direction: 'left'}, 500);
        }
      },
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
    $('#h-overlay').touchwipe({
      wipeRight: function() {$('#h-overlay').hide('slide', {direction: 'right'}, 500);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });
    $('#a-overlay').touchwipe({
      wipeLeft: function() {$('#a-overlay').hide('slide', {direction: 'left'}, 500);},
      min_move_x: 20,min_move_y: 20,preventDefaultEvents: true
    });


// Change characteristics of various elements when showabout div is clicked
	$("#showabout").on('click', function(){
        $('.about').css('opacity',showopac).css('z-index','2');
        $('.overlay').css('z-index','1');
        $('#showabout').css('display','none');
        $('#hannah_area,#aviva_area').css('z-index','0');
	});
// Change back characteristics of various elements when hideabout x is clicked
	$(".hideabout,.overlay").on('click', function(){
        $('.about').css('opacity','0').css('z-index','0');
        $('.overlay').css('z-index','0');
        $('#showabout').css('display','block');
        $('#hannah_area,#aviva_area').css('z-index','2');
        reset_dims_opac();
	});

});

