---
outadir: "../"
layout: HHblogpost.html
link: "./curtain-robot"
title: "The Saga of the Curtain Robot"
subtitle: "Wake the folk up"
date: 2019-04-03
pagetype: BLOG
draft: true
---
<script type="text/javascript" src="../../../js/highlight/highlight.pack.js"></script>
<link rel="stylesheet" href="../../../js/highlight/styles/arduino-light.css" type="text/css"/>
<script>hljs.initHighlightingOnLoad();</script>


About a million years ago, we decided to make a curtain robot. It would open the curtains in the morning, we would awaken in a gentle, gradual manner ensconsed in natural light and peer-reviewed merits, I would learn some Arduino. Everything would be great.

The road was a little bumpy, so if you just want to read a how-to, skip to [Part 3](#codeandparts). People who enjoy mild shadenfreude and rambliness might also like the rest of the article.

A note on audience: I tried to write this to make sense to someone with a similar level of background knowledge as me. That is, some coding experience, but not with C or C++. Some experience fiddling with strings and screws. Basically nothing about electronics, other than some elementary-school ideas like that one needs a source of electricity, signals can be transmitted via wires, and precautions should be taken against things like blowing a fuse or getting struck by lightning.
#### **_CONTENTS_**
1. **[Motivation](#sleep)**
1. **[Process](#messingaround)**
	- [What a drag](#whatadrag)
	- [Drivin' that chain](#drivinthatchain)
	- [Clocks](#clocks)
1. **[The basic How-to](#codeandparts)**
	- [Parts](#parts)
	- [Set-up](#setup)
	- [Code](#code)
1. **[Next steps](#nextsteps)**
	- [Daylight savings time](#dst)
	- [Adding a sensor and switch](#sensorswitch)
	- [Alternative tensioning](#tensioning)

<figure>
<video controls width='600'>
<source src='./speedyopenclose.mp4' type='video/mp4'>Your browser does not support the video tag.
</video>
<figcaption>The curtains opening via curtain robot! (Video sped up 5x and repeated backwards for symmetrical satisfaction)</figcaption>
</figure>

_______________________

<span id='sleep'></span>
### 1. Motivation

I really like sleeping, even though it's super weird and mysterious, as Q will agree.


<figure>
<a href="./qandpicard.jpg"><img src="./qandpicard.jpg" alt="Q and Picard in Deja Q" title="Click to see full-size image"></a>
<figcaption>Source: [IMDB](https://www.imdb.com/title/tt0708699/mediaindex).<br>Q: I've been entirely preoccupied by a most frightening experience of my own. A couple of hours ago, I realized that my body was no longer functioning properly. I felt weak, I could no longer stand. The life was oozing out of me, I lost consciousness.<br>
Picard: You fell asleep.</figcaption></figure>


And I usually sleep well and easily, as long as it's from about 1am to 10am. That turns out to be a bad match with being part of mainstream society, enjoying a 9-5, and some other things which I guess I wanted to keep open as an option. 

There is a really extensive body of scientific and spiritual exploration on sleep, and I found many suggestions of methods to make sleeping and waking up at an unnatural (for me) time easier. Among them was the idea that by having it be dark at night and then suddenly light at the time normal *[sic]* people wake up, (via closing and opening thick curtains), I might be able to trick my body into thinking that waking up earlier was a good idea.

Since many people have this problem, [products](https://bestlifeonline.com/best-sleep-products/) to [facilitate](https://www.housebeautiful.com/shopping/home-accessories/g22104882/bedroom-upgrades-better-sleep/) [sleeping](https://bestlifeonline.com/doctor-approved-full-nights-sleep/) are already abundant and available on the Free Market. These include sleep monitors, automatic lights, spa treatments, meditation apps, and medications. There are even existing products which specifically automatically open curtains. But I thought it would be cheaper and more fun to make my own. Jury's still out on whether that ended up being true.


<span id='messingaround'></span>
### 2. Process
We already have some heavy curtains, as described in a <a href='../curtains'>previous post</a>. We want to make the curtains open in the morning, without us having to be awake and out of bed to open them. While we're at it let's make them close at night, also without our help. But how?

The original idea was to start with a loop of string which runs parallel to the curtain rod. On one end of the curtain rod is a pulley wheel, on the other a continuous-rotation servo that spins around, dragging the loop of string around with it. The inner edge of the curtains are attached to the loop &mdash; one curtain to the top part of the loop and one to the bottom part. That way, when the loop goes around, the curtains are dragged open (i.e. in opposite directions). And when the string loop goes around the other way, they're dragged closed.

<figure><a href="./design1.png" target="_blank"><img src="./design1.png" alt="Diagram of the plan" title="Diagram of the plan. Click to see full-size image"></a><figcaption>Diagram of the plan (click to enlarge)</figcaption></figure>

<span id='whatadrag'></span>
#### *WHAT A DRAG*
We set everything up as planned, but, we had trouble getting the servo to gain traction on the string loop. We tried two solutions which both failed:
1. Putting a sewing machine bobbin on the servo shaft. That mostly spun around uselessly under the string loop. 
1. Wrapping the bobbin in a bunch of extra string so it would have more friction. With this method, the servo moaned and groaned for 30 seconds after which the curtains were maybe an inch open. 

At this point we gave up for 8-10 months, and continued living our lives like regular people who don't have a curtain robot.

<span id='drivinthatchain'></span>
#### *DRIVIN' THAT CHAIN*
Then we had the brilliant idea to attach a system of tiny gears to the servo and use a length of chain, instead of string, to interface with it. We actually thought of this early on, it just seemed prohibitively annoying and expensive. But after the lengthy period of robotless curtains, we had saved up the spare cash and lack of better ideas necessary to go through with it.


Ben got some metal plating and a system of gears and built the little mount and gear system for the servo, described in more detail [below](#setup), then replaced the segment of the string that had interacted with the servo with a piece of chain. No slippage occurred! One disadvantage of the new system was that the chain is heavier than the string, so it stretched out the hair-tie and made the loop sag unaesthetically. But things were moving!

<figure>
<video controls width='600'>
<source src='./noisy.mp4' type='video/mp4'>Your browser does not support the video tag.
</video>
<figcaption>A short clip of the original video, at normal speed and with sound: The robot is a bit of a chatterbox.</figcaption>
</figure>

New problems arose. It turns out the servo is pretty loud. Much louder than my phone alarm. So any hopes of softly stirring into the harsh, cold world rather than jolting up headlong were pretty dashed. But, no big deal, letting the sun shine in is still a good way to *stay* awake once awakened. Right?

We didn't get a chance to find out. After a few days of working decently, the curtains started closing again about 20 minutes after opening (while I was still in bed). This is exactly the kind of passive aggressive, Marvin-esque encouragement I was not looking for in a robot. It even took to saying "Fine, sleep all day, see if I care," and "I'm just here to servo," and sighing tragically when I rolled over. It also sometimes opened the curtains in the middle of the night, to show us the stars, and to show off that high decibel whirr of its motor. I unplugged it. Time passed.

<span id='clocks'></span>
#### *CLOCKS*
In order to measure said time that had passed, and also solve our problem, we decided to get an actual clock with a battery backup, instead of using the built-in time tracking capacities of the Arduino itself. 

You can read more about this in the [code]('#code') section, below, but basically the strategy for the code is to check what time it is every 30 seconds, and if it's 7:30 AM or PM, tell the servo to rotate so that the curtains open or close. The way it knows what direction to rotate the servo is by saving the current state of the curtains (open or closed) in a variable, _curtainstate_.

For checking the time, I'd been playing with the Time library, giving the Arduino the time from my computer when I plugged it in and using that for reference, and had also tried just running the loop after a 12 hour delay and counting on the value stored in the _curtainstate_ variable to determine the direction the servo should go each time. 

Perusing some online forums suggested that if there was a power outage, or maybe even a small power fluctuation, the time and _curtainstate_ variables could be getting reset to their initial values, and that might have been what was causing the random opening and closing problems. I'm still not totally sure if that's true, because there would have had to be a whole lot of power fluctuations for it to be as buggy as it was. Also, it never seemed to be confused about which direction to go, which is inconsistent with the explanation that the variables were getting reset. And I don't know how the time would get reset without the _curtainstate_ variable getting reset as well. 

Another possibility was 

But getting the clock seems to have fixed it. The cute little backup button battery will probably need replacing one day, but so far so good. I set it up, and redid the code to check the real clock time rather than just using a delay. The curtain robot has now been working for about a year!

<br>
<span id='codeandparts'></span>
### 3. The basic How-to
Disclaimer: As detailed in the previous sections, I'm a noob, this is all experimental and ad-hoc, you could probably find the parts for cheaper if you know where to look, etc. etc.

<span id='parts'></span>
#### _PARTS_
1. [Arduino Uno](https://store.arduino.cc/usa/arduino-uno-rev3)
1. Continuous-rotation servo ([FeeTech FS5106R](https://www.robotshop.com/en/feetech-fs5106r-continuous-servo-motor.html))
1. [Tiny breadboard](https://www.adafruit.com/product/65)
1. Lots of little [wires](https://www.adafruit.com/product/1956)
1. Real Time Clock ([DS3231 Precision RTC](https://learn.adafruit.com/adafruit-ds3231-precision-rtc-breakout/))
1. Button battery for the RTC ([Lithium Cell CR1220 3V](https://www.adafruit.com/product/380))
1. Five feet of [metal roller chain](https://www.servocity.com/0-250-chain-5-feet)
1. [Little gear](https://www.servocity.com/32p-25t-3f-spline-servo-mount-gears-acetyl), [big gear](https://www.servocity.com/32p-acetyl-hub-mount-spur-gears-0-125-face), and [hub sprocket](https://www.servocity.com/0-250-pitch-0-770-hole-pattern-acetyl-sprockets), for transferring servo rotation to chain
1. [Stainless steel shaft](https://www.servocity.com/0-250-1-4-stainless-steel-d-shafting), [steel set screw collars](https://www.servocity.com/steel-set-screw-collars), [set screw D-hub](https://www.servocity.com/0-770-set-screw-d-hubs), and [flanged ball bearing](https://www.servocity.com/0-250-id-x-0-500-od-flanged-ball-bearing), for connecting the gear system
1. [Servo plate](https://www.servocity.com/standard-servo-plate-d) and [aluminum channel](https://www.servocity.com/3-75-channel) for mounting servo and gear system to the windowsill
1. Screws
1. Small pulley wheel
1. L-bracket for mounting pulley wheel to windowsill
1. Somewhat thick string, we used ~2mm braided nylon
1. Optional hair-tie & paperclip for closing the string loop, the punker the better
1. Needle and thread for connecting curtains to pulley system


<span id='setup'></span>
#### _SET-UP_
The set-up starts with a loop of string, with a section of metal roller chain (looks like bike chain), which all runs parallel to the curtain rod. On one end of the curtain rod is a pulley wheel, on the other a continuous-rotation servo that spins around and, through a series of gears, pulls on the chain, making the loop move partway around. The inner edge of the curtains are attached to the loop &mdash; one curtain to the top part of the loop and one to the bottom part. That way, when the loop goes around, the curtains are dragged open (i.e. in opposite directions). And when the loop goes around the other way, they're dragged closed.

<figure><a href="./diagram.png" target="_blank"><img src="./diagram.png" alt="Final design sketch" title="Final design sketch. Click to see full-size image"></a><figcaption>Final design sketch (click to enlarge)</figcaption></figure>

<br>
__Pulley wheel and L bracket__<br>
The pulley wheel is pretty straightforward. We mounted it to the windowsill with an L-bracket and a little bolt, as pictured below.
<figure><a href="./pulley.jpg" target="_blank"><img src="./pulley.jpg" alt="Pulley wheel and L bracket" title="Pulley wheel and L bracket. Click to see full-size image"></a><figcaption>Pulley wheel and L bracket (click to enlarge)</figcaption></figure>

__Servo and gear system__<br>
The servo goes in the servo plate, and the little gear goes directly on the servo shaft. The big gear and the sprocket (for interfacing with the chain) go on the steel shaft, with the sprocket on the outside. Then that is inserted at the spot in the servo plate that makes the little gear on the servo shaft line up with the big gear. Something happens with the ball bearings, set screw collars and set screw D-hub. All of this is attached to the aluminum tunnel, which is  then attached to the top of the windowsill.

<figure><a href="./gears-front.jpg" target="_blank"><img src="./gears-front.jpg" alt="Gear system from front" title="Gear system from front. Click to see full-size image"></a><figcaption>Gear system from front (click to enlarge)</figcaption></figure>

<figure><a href="./gears-top.jpg" target="_blank"><img src="./gears-top.jpg" alt="Gear system from top" title="Gear system from top. Click to see full-size image"></a><figcaption>Gear system from top (click to enlarge)</figcaption></figure>

__String etc. loop and connecting to curtains__<br>
The string-and-chain loop should reach from one end of the curtain rod to the other, and back, and the section of  should be at least the width of one curtain. We made the string a little short and then connected the ends with a hair-tie and a paperclip, but I don't think the hair-tie and paperclip were very useful. One could probably just tie the ends of the string to the chain (after threading it through the pulley wheel). We kept a little give in the system so we can easily lift the chain on and off the sprocket. 

To attach the curtains to the system, I sewed a little piece of string to the inner edge of each curtain (while they were closed), and connected the strings from the left and right curtains to the spot directly above them on the bottom and top sections of the string loop. I think it would have been better to attach the strings from the curtains to spots on the string loop slightly toward the opposite curtain rather than directly above, so they fully close.

__Wires and pins__<br>
Arduino connected to servo, breadboard, RTC plugged into breadboard

<figure><a href="./wire-nest.jpg" target="_blank"><img src="./wire-nest.jpg" alt="Wires" title="Wires. Click to see full-size image"></a><figcaption>A mess of wires (click to enlarge)</figcaption></figure>

__Other set-up notes__<br>
For newbies like me: Download the Arduino IDE [here](https://www.arduino.cc/en/main/software). Upload the program to the Arduino via cord plugged into USB port on computer. Power the Arduino via cord plugged into USB adapter on wall outlet.

<br>
<span id='code'></span>
#### _CODE_

Below is the final script, in sequential pieces with copious explanation. [Here's](./curtaincode.ino) the uninterrupted version.

Get some libraries for talking to the clock
```c++
	// Date and time functions using a DS3231 RTC connected via I2C and Wire lib
	#include <Wire.h>
	#include "RTClib.h"

```
Set up the servo, including getting the servo library, telling it what pin the servo is attached to (in this case pin 9), then set a variable for whether the curtains are open or closed (this was useful for playing with servo speed and duration; you could close or open the curtains by hand and then tweak and test the code).
```c++
	// Servo set up
	#include <Servo.h>
	Servo myservo;
	#define servopin 9
	unsigned long curtainstate = 0; // 1 = open, 0 = closed
```

For a continuous-rotation (360 degrees) servo, the aspects one can control are its speed (which includes direction) and how long it runs for. Speed 90 means stopped, speeds less than 90 are counterclockwise and greater than 90 are clockwise. The farther from 90 in either direction, the faster the rotation. I picked 40 away from 90 through trial and error: it seemed to move the curtains at a decent speed without putting too much strain on the motor, (strain was determined qualitatively by how unhappy it sounded). 
```c++
	// servo speeds, >90=clockwise, <90=counterclockwise, 90=stop
	#define closespeed 50 // counterclockwise
	#define openspeed 130 // clockwise
```

Next, start setting up the clock. Days of the week aren't really necessary, but I copied this from an RTC set-up help page, and it does make you feel like the clock is really hip to what's happening when it prints out the day of the week in the serial monitor later. 
```c++
	// Clock set up
	RTC_DS3231 rtc;
	char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
``` 

Set _runinterval_ variable for how long to run the servo for to open and close the curtains, and _checkint_ variable for how often to check the clock to see whether it's time to open or close the curtains. The _runtinterval_ duration was arrived at by testing how long the servo has to run for at the speeds set above, for my particular set-up, in order for the curtains to be sufficiently open or closed. The _checkint_ variable was just the next round number that was longer than the run interval.
```c++
	// Initialize variables
	int runinterval = 27000; // number of milliseconds to run servo to open/close curtain
	int checkint = 30000; // number of milliseconds to check time (must be more than runinterval)
```

Set up the serial monitor, if available, so you can get reports on things like whether the clock is connected, and what time it thinks it is while you're developing. Also good for checking that you and the Arduino are in agreement about other things like whether the curtains are open, and how long it's been trying to open them.
```c++
	void setup () {

	// set up the serial monitor
	#ifndef ESP8266
	  while (!Serial); // for Leonardo/Micro/Zero
	#endif
	  Serial.begin(9600);
	  delay(3000); // wait for console opening
	  if (! rtc.begin()) {
	    Serial.println("Couldn't find RTC");
	    while (1);
	  }
	  if (rtc.lostPower()) {
	    Serial.println("RTC lost power, lets set the time!");
	    // following line sets the RTC to the date & time this sketch was compiled
	    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
	    // This line sets the RTC with an explicit date & time, for example to set
	    // January 21, 2014 at 3am you would call:
	    // rtc.adjust(DateTime(2014, 1, 21, 3, 0, 0));
	  }
	}
```

Finally, run the main loop, which opens and closes the curtains at your chosen times. The last line is a delay() for _checkint_ milliseconds, so basically the loop runs periodically (in our case every 30 seconds), checking the time and opening or closing the curtains when the time is right. The reason that _checkint_ must be more than _runinterval_ (as noted above) is to leave time for the curtains to open/close, if necessary, within the _checkint_ period, ie before restarting the loop that checks the time. This seems a little hacky, and I also read some things about delay() being a less than ideal function to use in general, but I haven't yet thought of a way around it.

The first section resets the _now_ variable (ie checks the time), then reports in the serial monitor (if available) what time it is for this iteration of the main loop.

The open and close loops are triggered if it is time to wake up (7:30 AM in this case) or go to bed/have the curtains closed (7:30 PM aka 19:30), respectively. 

I'm attaching and detatching the servo each time I want it to do something, rather than leaving it in the stopped position all the time, because it tended to eventually slip and start slowly moving in one direction or another even when set to stop. Related: sometimes this starts opening or closing the curtains not all the way, I think due to slow slipping. It [seems](https://thepihut.com/products/adafruit-continuous-rotation-servo-feetech-fs5103r) that the thing to do is adjust the Zero point via the tiny hole on the side, so now and then I run a little program that just writes 90 (stop) to the servo while I stick a screwdriver in its guts until it actually stops. Not sure if this is exactly best practice.
```c++
	// The meat: check time, open/close curtain if appropriate, wait an interval, rinse and repeat
	void loop () {
	    DateTime now = rtc.now();
	    
	    Serial.print(now.year(), DEC);
	    Serial.print('/');
	    Serial.print(now.month(), DEC);
	    Serial.print('/');
	    Serial.print(now.day(), DEC);
	    Serial.print(" (");
	    Serial.print(daysOfTheWeek[now.dayOfTheWeek()]);
	    Serial.print(") ");
	    Serial.print(now.hour(), DEC);
	    Serial.print(':');
	    Serial.print(now.minute(), DEC);
	    Serial.print(':');
	    Serial.print(now.second(), DEC);
	    Serial.println();

	// Check the time, if it is time to open or close the curtains, carry on
	// OPEN
	  if (now.hour()==7 && now.minute()==30) {
	      Serial.print("Time to wake up: ");
	     
	  // Check curtain state
	      if (curtainstate==1) {
	        Serial.print("Curtains are open already!");
	      }
	  // If closed, attach servo to pin, run servo for interval of time to open curtains
	  // then stop servo, detach, and reset curtain state   
	      else {
	        Serial.print("Curtains are closed - opening");
	        myservo.attach(servopin);
	        myservo.write(openspeed);
	        curtainstate=1; 
	        delay(runinterval);    
	        myservo.write(90);
	        myservo.detach();
	      }
	      
	  }  
	  
	// CLOSE
	  if (now.hour()==19 && now.minute()==30) {
	      Serial.print("Time to go to bed: ");
	      
	   // Check curtain state
	      if (curtainstate==0) {
	        Serial.print("Curtains are closed already!");
	      }
	      
	  // If open, attach servo to pin, run servo for interval of time to close curtains
	  // then stop servo, detach, and reset curtain state   
	      else {
	        Serial.print("Curtains are open - closing");
	        myservo.attach(servopin);
	        myservo.write(closespeed);
	        curtainstate=0; 
	        delay(runinterval);    
	        myservo.write(90);
	        myservo.detach();
	      }
	          
	  }  

	  delay(checkint); // check the time every x interval
	      
	}
```

<span id='nextsteps'></span>
### 4. Next steps
Despite this thrilling success story, there are a few things I still want to improve.

<span id='dst'></span>
#### **_DAYLIGHT SAVING TIME_**
Twice a year, I remember that I want to add [this code](https://www.instructables.com/id/Adding-Daylight-Savings-Time-to-Your-RTC/) or similar to automatically account for daylight saving time. But thus far, I've been in a rush and instead of doing it I just change the wake-up and bed-time times by an hour. It is still on the to-do list.

<span id='sensorswitch'></span>
#### **_ADDING A SENSOR AND A SWITCH_**
At one point we thought about using sensors to determine when the curtains had fully opened or closed, rather than just running the servo for a set amount of time. The idea would be to put a little flag on the edge of one of the curtains, sticking up above the curtain rod, then put a sensor on the curtain rod at the point where the curtains meet, and another on the far side. So when the flag got to each sensor the program would know to stop opening or closing. 

I had various ideas for spiffing up the flag, like by making it a little sculpture of a cat sitting with a tail below for balance, or a rowboat with oars that would spin as it ran along the curtain rod (a curtain robot row-boat!)

We got some [optical sensors](https://www.digikey.com/product-detail/en/adafruit-industries-llc/2168/1528-2526-ND/8258463&) and I played around with incorporating them, but there were a couple of challenges that made it seem not worthwhile. For one, it was tough to get them to sense input reliably, so I was having to write a backup loop that did basically the same thing the current code does anyway. That is, after _x_ amount of time, if you haven't encountered a sensor, you probably just missed it and may now be overstraining the system by trying to open or close curtains that are already as open or closed as they can be, so stop running. This backup plan isn't that different than just running the curtains for _x_ amount of time in the first place.

The sensor version of the program also meant the _checkint_ value ended up being a bit longer (to allow time for the sensors to try to work). That wasn't a big deal, but, it caused problems down the line if it got longer than a minute. Since the code was set up to open or close the curtain if the clock said it was a specific hour and minute when the time was checked, waiting longer meant there was a chance you could miss your one minute wake-up and bed-time openings. Probably not hard to work around, but it was getting more complicated. 

For two, I had trouble making a "flag" that consistently stayed in place, although that might have been fixable, I just didn't want to invest in it before addressing the first issue. 

One reason it would have been cool to have a sensor was that in some early versions of the plan, we hoped to have a switch for opening or closing the curtains at any time, in addition to the timer. Right now if we want to open or close the curtains at a non-standard time we have to climb up and pull the chain off the sprocket first, which is a little inconvenient. You may have noticed the switch in the photos in the set-up section — for now it's just hanging out not doing anything. If we did incorporate it, it would be useful to be able to tell whether the curtain is currently open or closed when the program receives input from the switch or the timer, and the sensor could help with that.

<span id='tensioning'></span>
#### **_ALTERNATIVE TENSIONING_**<br>
More here.



