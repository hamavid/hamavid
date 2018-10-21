
window.onload = function () {

// to add: make analyze button opaque if nothing has been changed since last analysis


//element.className = element.className.replace(/\bmystyle\b/g, "");
// functions to add and remove characters from the spans that show ignored chars
// remove
var xes = document.querySelectorAll('span.xout');
for(var i = 0; i < xes.length; i++) {xes[i].onclick=remove_ignore;}
function remove_ignore(){
	this.parentNode.parentNode.removeChild(this.parentNode);
}

// add
var iglist = document.querySelectorAll('#ignores')[0];
document.getElementById('addchar').onclick=add_ignore;
function add_ignore() {
	var added = document.getElementById('ignore-input').value;
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
		var thisone = igs[i].innerHTML;
		list.push('\\'+thisone);
	}
	return list;
}

// function to check on case sensitivity
function case_sense(){
	var checked = document.getElementById('casesense').checked;
	console.log(checked);
}

// function to analyze word count
document.getElementById('analyze').onclick = analyze;
function analyze() {
	console.log(ignores());
	// dim the analyze button
	document.getElementById('analyze').classList.add('dim');

	// check the input variable
	var input = document.getElementById('input').value;

	// edit/process input
	var edited = input;
	// make everything lowercase if we are NOT being case sensitive
	if (document.getElementById('casesense').checked == false){edited = edited.toLowerCase();}
	
	edited = edited.replace(/ {1,}/g,' '); // get rid of double spaces
	// loop through characters to ignore, taking them out of the input string
	for (var i=0; i<ignores().length; i++) {
		var re = new RegExp(ignores()[i],'g');
		edited = edited.replace(re,'');
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

	// sort dictionary according to checked preference
	//unique = unique.sort(); // sort unique words alphabetically (to add: options to sort alphabetically, by order of appearance, frequency, etc.)
	sorted = counts;
	keys = Object.keys(sorted);
	entries = Object.values(sorted);

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
	document.getElementById('resultsdiv').style.display = 'block';
};

};
