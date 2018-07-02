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
About a million years ago, we decided to make a curtain robot. It would open the curtains in the morning, we would awaken in a gentle, gradual manner ensconsed in natural light and peer-reviewed merits, I would learn some Arduino. Everything would be great.

Not all went as planned. I should backtrack. This post is about three things:
1. Sleep studies
1. Procrastination
1. Arduino programming


### Sleep studies
Also known as Products Marketed To You To (Supposedly) Help You Wake Up. This project is a DIY, probably more expensive version of those. 

Lights
Apps
Spas/meditations
Drugs


### Procrastination
Interspersed with debugging. Ok so we're gonna make the curtains open in the morning, and close at night. But how?

The original plan is to start with a loop of string that goes along the curtain rod. On one end of the curtain rod is a pulley wheel, on the other a continuous-rotation servo that makes the loop of string go around and around. We connected the two ends of the string into a loop with a hair-tie so it would have some tension in it. The inner edge of the curtains are attached to the string &mdash; one curtain to the top part of the loop and one to the bottom part. That way, when the string loop goes around, the curtains are dragged open (i.e. in opposite directions). And when the string loop goes around the other way, they're dragged closed.

[diagram of the plan]


#### *WHAT A DRAG*
We set everything up as planned, but, we had trouble getting the servo to gain traction on the string loop. We put a sewing machine bobbin on the servo shaft, but that mostly spun around uselessly under the string loop. We wrapped the bobbin in a bunch of extra string so it would have more friction, but when we tried running it that way, the servo still moaned and groaned for 30 seconds after which the curtains were maybe an inch open. At this point we gave up for 8-10 months, and continued living our lives like regular people who don't have a curtain robot.

Then we had the brilliant idea to 


#### *DRIVIN' THAT CHAIN*
It turns out the servo is pretty loud. Much louder than my phone alarm. So any hopes of softly stirring into the harsh cold world rather than jolting up headlong were pretty dashed. *But*, letting the sun shine in is still a good way to *stay* awake once awakened. Right?

We didn't get a chance to find out. After a few days of working decently, the curtains started closing again about 20 minutes after opening (while I was still in bed). This is exactly the kind of passive aggressive encouragement I was not looking for in a robot. It even took to saying "Fine, sleep all day, see if I care," and "I'm just here to servo," and sighing tragically when I rolled over. It also sometimes opened the curtains in the middle of the night, to show us the stars, and to show off that high decibel whirr of its motor. I unplugged it. Time passed.

#### *CLOCKS*


### Arduino programming
This is the part where I extra don't know what I'm doing. But luckily that's the theme of this blog!


If I ever publish this post, it will be great anecdata attesting to the possibility that you might still be able to finish that thing you started a million years ago #inspo #dailyinspo #failureisoktoo #youarestillagoodperson #probably.
This section could be called Debugging, but that might imply some sort of active, timely problem-solving. Instead it was a very, very laid-back process. 




