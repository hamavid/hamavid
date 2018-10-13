---
outadir: "../"
layout: HHblogpost.html
link: "./wordcount"
title: "Word count"
subtitle: "("
date: 2018-10-11
pagetype: BLOG
draft: true
---
<div>
<div id='inputdiv'>
	<h3>Input</h3>
	<p><em><strong>Words to analyze</strong></em><br>
	<textarea id='input'>
	But all that seems distant and all  that seems far, From those wonderful nights at the palace of the Czar, hey hey hey I was shootin' with Rasputin, ate farina with Czarina, Blintzes with the princes of the Czar. Hey hey hey We were sharing tea and herring, dipped banana in Smetana, Borscht  and vorscht around the samovar, hey hey
	</textarea></p>
	<p><input type='checkbox' id='casesense'> <label for='casesense'>Case-sensitive</label></p>
	<p><em><strong>Characters or words to ignore</strong></em><br>
	<input id='ignore-input'></input><span id='addchar'>Add</span><br>
	<div id='ignores'>
		<div><span class='xout'>x</span><span class='ignorchar'>hey</span></div>
	</div></p><br>
	<p style='text-align:center;'><a href='./#resultsdiv' class='vizbutton' id='analyze'>Analyze</a></p>
</div>
<div id='resultsdiv'>
	<h3>Results</h3>
	<div class='summarytable'>
		<table><tbody>
		<tr><td>Total word count:</td><td id='total'></td></tr>
		<tr><td>Unique word count:</td><td id='unique'></td></tr>
		</tbody></table>
	</div><br>
	<div class='wordtable-outer'>
		<table>
		<thead><th>Word</th><th>Occurrences</th></thead>
		<tbody></tbody>
		</table>
	</div>
</div>	
</div>