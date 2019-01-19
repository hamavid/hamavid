---
outadir: "../"
layout: HHblogpost.html
link: "./wordcount"
title: "Word count"
subtitle: "How many of each word is there in this text?"
date: 2018-11-03
pagetype: BLOG
draft: false
---
<div>
<div id='helpignore'>
<span id="hideignore"><i class="fa fa-lg fa-remove"></i></span><br>
<div id='helpignorecontent'>A string of characters added to the ignore-list is ignored anywhere it is found, even within a word. For example, ignoring "by" would get rid of the word "by", but also turn "bye" into "e", and "abyss" into "ass". To ignore an entire word, surround it with spaces, for example " by ". If the word is sometimes followed by punctuation, add the word with its punctuation, for example " by, ". If it is the first or last word of your entire input text, add a space before and/or after the input text before clicking Analyze.
</div>
</div>
<!-- overlay so background is covered when help section is showing -->
<div class="ignoreoverlay"></div>	

<div id='inputdiv'>
	<h3>Input</h3>
	<p><em><strong>Words to analyze</strong></em><br>
	<textarea id='input'>But all that seems distant and all  that seems far, From those wonderful nights at the palace of the Czar, hey hey hey I was shootin' with Rasputin, ate farina with Czarina, Blintzes with the princes of the Czar. Hey hey hey We were sharing tea and herring, dipped banana in Smetana, Borscht  and vorscht around the samovar, hey hey</textarea>
	</p>
	<p><input type='checkbox' id='casesense'> <label for='casesense'>Case-sensitive</label></p>
	<p><em><strong>Character strings to ignore</strong></em> <span id='helpignoreicon'><i class="fa fa-question-circle" aria-hidden="true"></i></span><br>
	<input id='ignore-input'></input><span id='addchar'>Add</span><br>
	<div id='ignores'>
		<div><span class='xout'>x</span><span class='ignorchar'>that</span></div>
	</div></p><br>
	<p style='text-align:center;'><span class='vizbutton' id='analyze'>Analyze</span></p>
</div>
<div id='resultsdiv'>
	<h3>Results</h3>
	<div class='summarytable'>
		<table><tbody>
		<tr><td>Total word count:</td><td id='total'>--</td></tr>
		<tr><td>Unique word count:</td><td id='unique'>--</td></tr>
		</tbody></table>
	</div><br>
	<div id='sortby-outer'><span><strong>Sort:</strong> </span>
	<select id='sortby'>
	<option value='appear'>By order of appearance</option>
	<option value='alpha'>Alphabetically</option>
	<option value='backalpha'>Reverse alphabetically</option>
	<option value='freq-asc'>By frequency (ascending)</option>
	<option value='freq-desc'>By frequency (descending)</option>
	</select>
	</div>
	<div class='wordtable-outer'>
		<table>
		<thead><th>Word</th><th>Occurrences</th></thead>
		<tbody><tr><td>--</td><td>--</td></tr></tbody>
		</table>
	</div>
</div>
<div id='explanation' style='display:block;'>
<h4>Why did I make this thing?</h4>
<p>It seems like there is demand for a tool like this, since similar web-apps exist: There's a <a href='http://www.writewords.org.uk/word_count.asp'>Word Frequency Counter</a> that produces an equivalent word-by-word table of results, but is otherwise pretty bare bones. <a href='https://wordcounter.net/'>Wordcounter.net</a> is also a cool site that reports all sorts of things I didn't bother with, like number of characters, keyword density, and estimated reading or speaking time. But it doesn't put out the itemized table. And <a href='https://wordcounttools.com/'>Wordcounttools.com</a> does an analysis of syllables and readability scores, which <a href='https://www.webpagefx.com/tools/read-able/readability-score.html'>turn</a> <a href='https://datayze.com/readability-analyzer.php'>out to be</a> <a href='http://www.readabilityformulas.com/free-readability-formula-tests.php'>a whole</a> <a href='https://readable.io/'>world</a>. There are also many web-apps that do a basic total word and character count. None of the ones I found include the ability to customize the analysis (case sensitivity, ignorable strings) or sort results (by order of appearance, frequency, or The Alphabet). So arguably this tool has some unique features on top of the baseline, apparently desired function, and therefore it is useful if you want to do those things.</p>

<p>On the other hand, this has a lot in common with a word cloud, and <a href='https://www.jasondavies.com/wordcloud/'>there</a> <a href='https://www.wordclouds.com/'>are</a> 
<a href='https://tagcrowd.com/'>multiple</a> <a href='http://www.wordle.net/'>apps</a> for that. <a href='https://www.maxqda.com/help-max18/visual-tools/word-clouds'>This one</a> in particular looks like it would make a table similar to the one I make here, along with lots of other lovely aesthetic stuff.</p>

<p>And actually I made this because I wanted to know how many different words were in the chorus of a certain song &mdash; the default input text on this post &mdash; and didn't immediately find an existing tool when I searched for one. Specifically, I thought 40 unique words would sound less intimidating than 60 overall words when trying to teach the song. Even better, once you've learned "hey" you're 13% of the way there! Also, a friend had been talking to me about compression algorithms, so ways to make information compact were on the mind. I realized a couple minutes after thinking all this that it was silly on a number of levels, and in no way simplifying things for humans. But by then the wondering was too great and I had to make the app anyway.</p>

<p>If you find a bug or think of a cool thing to add, and you are <a href='https://www.theguardian.com/science/brain-flapping/2017/may/30/why-do-pedants-pedant'>nice and collaborative about it</a>, feel free to email me!</p>
<!-- TO ADD:
package exclusions like prepostions
dont separate words by apostrophe
-->
</div>
</div>
