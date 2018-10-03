---
outadir: "../"
layout: HHblogpost.html
link: "./curtain-robot"
title: "The Saga of the Curtain Robot"
subtitle: "Wake the folk up"
date: 2018-05-15
pagetype: BLOG
draft: true
---
<!--<script type="text/javascript" src="../../../js/highlight/highlight.pack.js"></script>
<link rel="stylesheet" href="../../../js/highlight/styles/arduino-light.css" type="text/css"/>-->

About a million years ago, we decided to make a curtain robot. It would open the curtains in the morning, we would awaken in a gentle, gradual manner ensconsed in natural light and peer-reviewed merits, I would learn some Arduino. Everything would be great.

Not all went as planned. I should backtrack. This post will be structured like so:
1. [Sleep](#sleep)
1. [Messing around](#messingaround)
1. [Code and parts](#codeandparts)
1. [Are we done yet](#arewedoneyet)


<h3 id="sleep">Sleep</h3>

Sleep, for me, falls into the category of things that are fun and terrifying at the same time. (Other things on this list include trad climbing, playing music in front of people, falling in love, and airplanes.)


<figure><iframe width="560" height="315" src="https://www.youtube.com/embed/kkvtmYRPQ_Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><figcaption style="text-align: left;">Q: I've been entirely preoccupied by a most frightening experience of my own. A couple of hours ago, I realized that my body was no longer functioning properly. I felt weak, I could no longer stand. The life was oozing out of me, I lost consciousness.<br>
Picard: You fell asleep.</figcaption></figure>


There is a really extensive body of scientific and spiritual exploration on this subject. I'm not going to do justice to it here but will nod (off) at it a little.


I like falling asleep at 1am and waking up at 10am, but that's not good for being part of mainstream society. We thought that by having it be dark at night and then suddenly light at the time normal people wake up, (via closing and opening thick curtains), we could trick my body into thinking that waking up earlier was a good idea. This hypothesis is supported by multiple studies, and products to facilitate the procedure are already abundant and available on the free, free market.

https://bestlifeonline.com/best-sleep-products/
https://www.housebeautiful.com/shopping/home-accessories/g22104882/bedroom-upgrades-better-sleep/
https://bestlifeonline.com/doctor-approved-full-nights-sleep/


http://www.ursulakleguin.com/EricBeddows/15-WakeIsland.html
About a population of people genetically engineered not to need sleep, who never fully achieve consciousness.

Lights
Apps
Spas/meditations
Drugs


<h3 id="messingaround">Messing around</h3>
We already have some heavy curtains, as described in a previous post. We want to make the curtains open in the morning, without us having to be awake and out of bed to open them. While we're at it let's make them close at night, also without our help. But how?

The original plan is to start with a loop of string that goes along the curtain rod. On one end of the curtain rod is a pulley wheel, on the other a continuous-rotation servo that makes the loop of string go around and around. We connected the two ends of the string into a loop with a hair-tie so it would have some tension in it. The inner edge of the curtains are attached to the string &mdash; one curtain to the top part of the loop and one to the bottom part. That way, when the string loop goes around, the curtains are dragged open (i.e. in opposite directions). And when the string loop goes around the other way, they're dragged closed.

<figure><a href="./design1.png"><img src="./design1.png" alt="Diagram of the plan" title="Click to see full-size image"></a><figcaption>Diagram of the plan</figcaption></figure>


#### *WHAT A DRAG*
We set everything up as planned, but, we had trouble getting the servo to gain traction on the string loop. We tried two solutions which both failed:
1. Putting sewing machine bobbin on the servo shaft. That mostly spun around uselessly under the string loop. 
1. Wrapping the bobbin in a bunch of extra string so it would have more friction. With this method, the servo moaned and groaned for 30 seconds after which the curtains were maybe an inch open. 

At this point we gave up for 8-10 months, and continued living our lives like regular people who don't have a curtain robot.

Then we had the brilliant idea to 


#### *DRIVIN' THAT CHAIN*
It turns out the servo is pretty loud. Much louder than my phone alarm. So any hopes of softly stirring into the harsh cold world rather than jolting up headlong were pretty dashed. *But*, letting the sun shine in is still a good way to *stay* awake once awakened. Right?

We didn't get a chance to find out. After a few days of working decently, the curtains started closing again about 20 minutes after opening (while I was still in bed). This is exactly the kind of passive aggressive encouragement I was not looking for in a robot. It even took to saying "Fine, sleep all day, see if I care," and "I'm just here to servo," and sighing tragically when I rolled over. It also sometimes opened the curtains in the middle of the night, to show us the stars, and to show off that high decibel whirr of its motor. I unplugged it. Time passed.

#### *CLOCKS*


<h3 id="codeandparts">Code and parts</h3>
	// Date and time functions using a DS3231 RTC connected via I2C and Wire lib
	#include <Wire.h>
	#include "RTClib.h"

	// servo set up
	#include <Servo.h>
	Servo myservo;
	#define servopin 9
	unsigned long curtainstate = 0; // 1 = open, 0 = closed
	// servo speeds, >90=clockwise, <90=counterclockwise, 90=stop
	#define closespeed 50 // counterclockwise
	#define openspeed 130 // clockwise

	// Clock set up
	RTC_DS3231 rtc;
	char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

	// Initialize variables
	unsigned long previousTime = 0;
	unsigned long currentTime = 0;
	int runinterval = 27000; // number of milliseconds to run servo to open/close curtain
	int checkint = 30000; // number of milliseconds to check time (must be more than runinterval)

	void setup () {

	// Turn off the LED so it doesn't burn out
	  pinMode(13,OUTPUT);
	  digitalWrite(13,LOW);

	// Setting up the serial monitor -- possibly only for debugging?
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
	  //if (now.minute() % 2==0) {
	      Serial.print("Time to wake up: ");
	     
	  // Check curtain state
	      if (curtainstate==1) {
	        Serial.print("Curtains are open already!");
	      }
	  // If closed, attach servo to pin, run servo for interval of time to open curtains
	  // stop servo, detach, and reset curtain state   
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
	  if (now.hour()==20 && now.minute()==30) {
	  //if (now.minute() % 2 ==1) {
	      Serial.print("Time to go to bed: ");
	      
	   // Check curtain state
	      if (curtainstate==0) {
	        Serial.print("Curtains are closed already!");
	      }
	      
	  // If open, attach servo to pin, run servo for interval of time to close curtains
	  // stop servo, detach, and reset curtain state   
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

<h3 id="arewedoneyet">Are We Done Yet?</h3>
We will never be done! Specifically, there are a few things I want improve:
1. Adding a sensor
2. Something different for tensioning
3. A switch to open and close at other times



This is the part where I extra don't know what I'm doing. But luckily that's the theme of this blog!
If I ever publish this post, it will be great anecdata attesting to the possibility that you might still be able to finish that thing you started a million years ago #inspo #dailyinspo #failureisoktoo #youarestillagoodperson #probably.
This section could be called Debugging, but that might imply some sort of active, timely problem-solving. Instead it was a very, very laid-back process. 
Also known as Products Marketed To You To (Supposedly) Help You Wake Up. This project is a DIY, probably more expensive version of those. 

<script>

</script>


