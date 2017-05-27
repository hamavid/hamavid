---
outadir: "../"
layout: HHblogpost.html
link: "./pogoviz"
title: "How much does the cat eat?"
date: 2017-04-14
pagetype: BLOG
---

The quick answer to this fascinating question is that the cat ate a daily average of **5.8 tablespoons of dry food** ([Science Diet Indoor Kitten](http://www.hillspet.com/en/us/products/sd-feline-kitten-indoor-dry)) and **1.4 ounces of wet food** (brand and flavor varied) over the 96-day study period.

If you'd like to visualize the daily breakdown of cat food consumption with the help of two basic (interactive!) line charts, please click the link below. As a bonus, you will also get to visualize the cat himself!

<p style="text-align:center;padding:1.5em;"><a href="viz" class="vizbutton">See the viz</a></p>

### Motivation
I wanted to try dabbling in D3 and needed some real, but not too complicated data to start me out. Real so I'd have to map my situation to the tutorial examples, simple enough to stick to without reverting to a tool I already knew. I also planned to put the results on this blog, but I'm ambivalent about putting anything meaningful online, so I wanted to err on the side of boring over controversial or highly personal. Cat food seemed like an innocuous topic aside from exposing us as arguable helicopter parents and definite nerds.

### Data collection
A few weeks after Pogo started living with us, we began writing on the dry erase board on the fridge every time we fed him. Kibble was measured in tablespoon (T) scoops and wet food was estimated as a fraction of a 5.5 ounce (Oz) can. When space ran out on the dry erase board, I copied the data over to a Google spreadsheet, dry-erased the board, and we started tracking again. And again. After two months, we had a respectable-sized dataset detailing Pogo's food consumption as he grew from an 11 week old kitten who loved to attack rubber balls from the safety of an empty 12-pack into a 3 month old pre-teen who enjoyed batting at bouncy spheres from the shelter of slightly larger boxes.

<figure><img src="images/data.jpg" title="Dry-erase board with data"><figcaption>Cat food data collection in top right</figcaption></figure>

### Results
Cat food consumption was tracked for 96 days from Nov 24, 2016 through Feb 27, 2017. Over this observation period, Pogo ate an average of 5.8T dry and 1.4Oz wet food per day. Daily dry food consumption ranged from 2 to 8T, while wet food was between 0 and 1.83Oz. Wet food remained fairly consistent at either 1.38 or 1.83Oz daily (1/4 and 1/3 of a can, respectively), dipping below 1.38 for only 7 of the 96 days. Dry food followed an upward trend until around the new year, increasing a tablespoon every 11 days from 4 to 7T (R<sup>2</sup>=0.48). It then levelled off to just under 6T for the remainder of the observation period.


### Discussion
Nothing particularly surprising was identified by this study. Increasing dry food consumption in the first 5 weeks followed by a flattening off might have corresponded with fluctuations in Pogo's growth rate and subsequent hunger levels. Several days of decreased or missing wet food were explained by unusual circumstances. For instance, on Dec 16th and 17th we ran out of wet food, and on Jan 8th Pogo's food was restricted in preparation for neutering. Other variations in apparent appetite for wet food may have been attributable to flavor preferences, which we did not track. On a few ocassions when wet food consumption was down, more dry food was consumed, possibly to compensate, but there are not enough data to make a strong assertion. A further limitation of this study is that the distinction between provision and consumption of food was not well defined. There may have been times when Pogo would have eaten more food if we had provided it, while at other times he did not eat all of the food that was available, and we did not always adjust the data accordingly. Pogo's tendency to "<a href="http://www.catbehaviorassociates.com/why-do-cats-bury-food/">bury</a>" food that he did not finish may have indicated satiation in several instances.

<figure><img src="images/burying.jpg" title="Water bowl and food plates with one partially lodged under the fridge"><figcaption>Almost-finished wet food plate successfully buried under the fridge</figcaption></figure>


### Areas for further study
As mentioned above, this "study" is&mdash;by design&mdash;pretty boring. Any actual discoveries about cat food consumption were incidental to the main goal of producing data for me to use to play with D3. Future studies could be made more interesting by tracking additional phenomena such as water intake, exercise, excretion, or weight gain, and exploring how these correlate with food consumption. For instance, does increased hydration correspond with less consumption of wet food? How much does water or food intake go up after exercise? To what extent does food consumption increase with weight gain and vice versa? Water was initially tracked but was dropped from the final report due to haphazard record-keeeping. Excretion didn't seem fun to track. Coming up with a metric for exercise was too complex for the scope of this study, and data collection would have involved monitoring Pogo's behavior more consistently than was feasible. Similarly, a few data for weight were obtained during vet visits, but later attempts to gather data were foiled by the impracticality of convincing Pogo to stand still on the scale we have at home, which is nominally for baking. 


