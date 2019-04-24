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
  if (now.hour()==19 && now.minute()==30) {
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

