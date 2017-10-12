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
	// determine which size of about to show
		if (windowwidth<=450 || $(window).height()<=450) {
        	$('.smallabout').css('display','block');
        	$('.largeabout').css('display','none');
    	} else {
    		$('.smallabout').css('display','none');
        	$('.largeabout').css('display','block');
    	}
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

// Change characteristics of various elements when showabout div is clicked
	$("#showabout").on('click', function(){
        $('.about').css('opacity',showopac).css('z-index','2');
        $('.overlay').css('z-index','2');
        $('#showabout').css('display','none');
	});
// Change back characteristics of various elements when hideabout x is clicked
	$(".hideabout,.overlay").on('click', function(){
        $('.about').css('opacity','0').css('z-index','0');
        $('.overlay').css('z-index','0');
        $('#showabout').css('display','block');
        reset_dims_opac();
	});

});

