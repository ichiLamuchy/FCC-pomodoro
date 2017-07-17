/* 
Pomodoro clock
Pomodoro technic is that breaking down work into intervals, 
traditionally 25 minutes in length, separated by short breaks.
THis programme alart you when your session (work time) is up and take a break.
Use can set new time 

trouble 1: cannot impliment stop button
2: when i use + & - button for during count down, it will bess up the count down as it stores new variable
*/


$(document).ready(function(){

  // need two set of varibles, one for set the length, another one for counting down
  var breakCount =parseInt ($("#breakLenSet").html());
  var sessionCount = parseInt ($("#sessionLenSet").html());
  var breakLen =parseInt ($("#breakLenSet").html());
  var sessionLen = parseInt ($("#sessionLenSet").html());
  // initial display
  $(".countDown").html(convertFromSec(sessionCount));
  var windowBoo  = true;
  // Audio alarm
  var bellSound = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  var stopButtonSelector = document.getElementById("stop");
  stopButtonSelector.addEventListener("click", function (event){
     windowBoo = false;
    console.log(windowBoo);
  });
  //Function converting from sec to min for set content to display
  function convertFromSec (sec){
    var min = Math.floor (sec/60);
    var secs = sec%60;
    
    if(secs<10) {secs = "0" + secs;}
    if (min == 0){ return secs;}  
    else{ return min +":" + secs;}     
  }
  
  // when click the number in the middle
  $(".countDown").click(function(){
      // setInterval calls function sessionCounter which defined below
       var countDownSession = setInterval(sessionCounter, 1000);
       function sessionCounter(){         
          $(".countDown").html(convertFromSec(sessionCount));
          sessionCount -=1;
          if (! windowBoo){
            clearInterval (countDownSession);
          }
         
          
          
          // when it countdown to 0 
          if (sessionCount == 0){
              $(".countDown").html(convertFromSec(sessionCount));
              clearInterval (countDownSession);
              // alarm
              bellSound.play();
              // swich to break countdown
              $(".active").html("break time!");
              var countDownBreak = setInterval(breakCounter, 1000);
               
              function breakCounter(){
                  $(".countDown").html(convertFromSec(breakCount));
                  breakCount -= 1;
                  if (breakCount == 0){
                      $(".countDown").html(convertFromSec(breakCount));
                      clearInterval (countDownBreak);
                  }
              }
          }
       }       
 });
 
    // to change break length
 $("#minus1Break").click(function(){
      breakLen -= 60;
      if (breakLen > 0){
        $("#breakLenSet").html(convertFromSec(breakLen));
      }
      else{
        breakLen = 0;
        $("#breakLenSet").html(convertFromSec(breakLen));
      }
  });  
  $("#plus1Break").click(function(){
      breakLen += 60;
      $("#breakLenSet").html(convertFromSec(breakLen));
  });
  
  // to change the session length
  $("#minus1Session").click(function(){ 
    sessionLen -= 60;  
    if (sessionLen > 0){  
      $("#sessionLenSet").html(convertFromSec(sessionLen));
    }
    else {
      sessionLen = 0;
      $("#sessionLenSet").html(convertFromSec(sessionLen));
    }
  });
  
  $("#plus1Session").click(function(){
      sessionLen += 60;
      $("#sessionLenSet").html(convertFromSec(sessionLen));
  });
  
  // reset - funcion takes breakLen and sessionLen to reset 
  $("#reset").click(function(){
    // .active change to "session" from "breaktime!"
      $(".active").html("session");
      windowBoo = true;
    //this need to be update unless length has been changed with above click
      sessionCount = sessionLen;
      breakCount = breakLen;
      $(".countDown").html(convertFromSec(sessionCount));
  });
  

  /*dont kmow why it does not work
  $("#stop").click(function (){
     $(.countDown).stop();
     });
  */
 
            
});