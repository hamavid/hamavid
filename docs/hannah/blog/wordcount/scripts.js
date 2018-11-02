
window.onload = function () {

// set globally accessible variables
	var sortselector = document.getElementById('sortby');
	var lastlength;
	document.getElementById('input').onkeydown = function() {
		lastlength=document.getElementById('input').value.length;return lastlength;
	}

// hide/show explanation
	var pictogbuttons = document.getElementsByClassName('picture-toggle-button');
	for (var i = 0; i < pictogbuttons.length; i++) {pictogbuttons[i].onclick=toggleexplanation;}
	function toggleexplanation() {
		if (document.getElementById('explanation').style.display == 'block') {
			document.getElementById('explanation').style.display = 'none';
			for (var i = 0; i < pictogbuttons.length; i++) {pictogbuttons[i].innerHTML = 'Show explanation';}
		} else {
			document.getElementById('explanation').style.display = 'block';
			for (var i = 0; i < pictogbuttons.length; i++) {pictogbuttons[i].innerHTML = 'Hide explanation';}
		}
	}


/* ------------ BUTTON DIMMING ---------------*/
// fxn to UNdim the analyze button
	function undim() {
		if (document.getElementById('input').value.length > 0) {
			document.getElementById('analyze').classList.remove('dim');
		}
	}
// fxn to DIM analyze button
	function dim() {document.getElementById('analyze').classList.add('dim');}


// UNdim analyze button if case check status changes or text in input box changes (and has content)
	document.getElementById('casesense').onclick = undim;
	document.getElementById('input').onkeyup = function() {
		// Get last typed character so we can check that it's not a  space
		// only undim if not a space or if the last thing that happened was to delete text
	    var lastChar = String.fromCharCode(this.value.charCodeAt(this.selectionStart - 1));
	    if (lastChar != " " || this.value.length < lastlength){undim();}
		if (this.value.length == 0) {dim();} // dim if there is no input text
	}


/* -----IGNORE SECTION ----------*/
// Change characteristics of various elements when helpignore span is clicked
	document.getElementById('helpignoreicon').onclick = showhelpignore;
	function showhelpignore(){
        document.getElementById('helpignore').style.zIndex = '3';
        document.getElementsByClassName('ignoreoverlay')[0].style.zIndex = '2';
        document.getElementById('helpignore').style.opacity = '1';
        document.getElementsByClassName('ignoreoverlay')[0].style.opacity = '1';
	};
// Change back characteristics of various elements when hideignore x is clicked
	document.getElementById('hideignore').onclick = hidehelpignore;
	document.getElementsByClassName('ignoreoverlay')[0].onclick = hidehelpignore;
	function hidehelpignore() {
       	document.getElementById('helpignore').style.zIndex = '-2';
        document.getElementsByClassName('ignoreoverlay')[0].style.zIndex = '-2';
        document.getElementById('helpignore').style.opacity = '0';
        document.getElementsByClassName('ignoreoverlay')[0].style.opacity = '0';
	};


// functions to add and remove characters from the spans that show ignored chars
// remove
	var xes = document.querySelectorAll('span.xout');
	for(var i = 0; i < xes.length; i++) {xes[i].onclick=remove_ignore;}
	function remove_ignore(){
		undim();
		this.parentNode.parentNode.removeChild(this.parentNode);
	}

// add
	var iglist = document.querySelectorAll('#ignores')[0];
	document.getElementById('addchar').onclick=add_ignore;
	function add_ignore() {
		var added = document.getElementById('ignore-input').value;
		// If anything has been added, UNdim the analyze button
		if (added.length > 0) {undim();}
		var div = document.createElement('div');
		var span1 = document.createElement('span');
		span1.className = 'xout';span1.innerHTML = 'x';div.append(span1);
		var span2 = document.createElement('span');
		span2.className = 'ignorchar';span2.innerHTML = added;
		div.append(span2);iglist.append(div);
		document.getElementById('ignore-input').value ='';
		var xes = document.querySelectorAll('span.xout');
		for(var i = 0; i < xes.length; i++) {xes[i].onclick=remove_ignore;}
	}


// function to return list of ignored chars as a variable for analysis
	function ignores(){
		var list = [];
		var igs = document.querySelectorAll('span.ignorchar');
		for(var i = 0; i < igs.length; i++){
			var thisone = String.raw`${igs[i].innerHTML}`;
			//list.push('\\'+thisone);
			list.push(thisone);
		}
		return list;
	}


/* -------------- ANALYSIS ----------------*/
// function to analyze word count
	document.getElementById('analyze').onclick = analyze;
	function analyze() {
		// dim the analyze button
		dim();

		// check the input variable
		var input = document.getElementById('input').value;

		// edit/process input
		var edited = input;
		// make everything lowercase if we are NOT being case sensitive
		if (document.getElementById('casesense').checked == false){edited = edited.toLowerCase();}
		
		edited = edited.replace(/ {1,}/g,' '); // get rid of double spaces
		// TO DO, maybe: put this in another while/anyleft loop so it doesn't matter what order the ignorables are in
		// loop through characters/words to ignore, taking them out of the input string
		for (var i=0; i<ignores().length; i++) {
			//var re = new RegExp(ignores()[i],'g'); // no regex because of special characters
			var re = String.raw`${ignores()[i]}`;
			var anyleft = 1;
			while (anyleft) {
				edited = edited.replace(re,'');
				edited = edited.replace(/ {1,}/g,' ');
				if (edited.indexOf(re) == -1) {anyleft = 0;}
			}
			
		}

	// get initial numbers/subsets
		edited = edited.match(/\b(\w+)\b/g);
		var unique = Array.from(new Set(edited));

	// loop through unique words, counting their occurrences in the full string and adding to dictionary of results
		var counts = {}
		for (var i=0; i<unique.length; i++) {
			var word = unique[i];
			var occ = 0;
			for (var j=0; j<edited.length; j++) {
				if (edited[j] == word){occ += 1;}
			}
			counts[word] = occ;	
		}
		keys = Object.keys(counts);
		entries = Object.values(counts);

	// create table of word-count results
		// remove old table
			var oldtable = document.querySelectorAll('.wordtable-outer tbody')[0];
			var outer = oldtable.parentNode;
			outer.removeChild(oldtable);
		// start a new one and build to it
			var resultstable = document.createElement('tbody');
			resultstable.setAttribute('id','wordtable-inner');
			for (var i=0; i<keys.length; i++) {
				var newrow = document.createElement('tr');
				var wordcell = document.createElement('td');
				newrow.append(wordcell);
				wordcell.innerHTML = keys[i];
				var countcell = document.createElement('td');
				newrow.append(countcell);
				countcell.innerHTML = entries[i];
				resultstable.append(newrow)
			}
		// add new table where it goes
			outer.append(resultstable);
		
	// populate elements and show results div
		document.getElementById('total').innerHTML = edited.length;
		document.getElementById('unique').innerHTML = unique.length;
		//document.getElementById('resultsdiv').style.display = 'block';

	// sort table according to checked preference, if preference is not default (in order of appearance)
		var value = sortselector.options[sortselector.selectedIndex].value;
		if (value != 'appear') {trigger_sort(value);}
	};

/* ------------------ SORTING -----------------*/
// determine what options are selected from the dropdown, sort accordingly
	sortselector.onchange = function() {
		var value = sortselector.options[sortselector.selectedIndex].value;
		trigger_sort(value);
	}
	function trigger_sort(value) {
		if (value == 'alpha' || value == 'backalpha') {sortTable(0, value);}
		else if (value == 'freq-asc' || value == 'freq-desc') {sortTable(1, value);}
		else if (value == 'appear') {analyze();}
	}

// fxn to sort table (from https://www.w3schools.com/howto/howto_js_sort_table.asp)
	function sortTable(n, sorttype) {
		var table, rows, switching, i, x, y, shouldSwitch, sorttype, switchcount = 0;
		var table = document.querySelectorAll('.wordtable-outer table')[0];
		var switching = true;
	// Make a loop that will continue until no switching has been done
		while (switching) {
		// Start by saying: no switching is done
			switching = false;
			rows = table.rows;
		//Loop through all table rows (except the first, which contains table headers)
			for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching
				shouldSwitch = false;
			// Get the two elements you want to compare, one from current row and one from the next
				x = rows[i].getElementsByTagName("TD")[n];
				y = rows[i + 1].getElementsByTagName("TD")[n];
			// Check if the two rows should switch place, based on the direction, flag if so and break loop
				if (sorttype == "alpha") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {shouldSwitch = true;break;}
				} else if (sorttype == "backalpha") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {shouldSwitch = true;break;}
				} else if (sorttype == "freq-asc") {
					if (Number(x.innerHTML) > Number(y.innerHTML)) {shouldSwitch = true;break;}
				} else if (sorttype == "freq-desc") {
					if (Number(x.innerHTML) < Number(y.innerHTML)) {shouldSwitch = true;break;}
				}
			}
		// If a switch has been flagged, make the switch and mark that a switch has been done
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;switchcount ++; 
			}
		}
	}


};

