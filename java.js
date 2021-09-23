// P O M O D O R O   T I M E R

var tf;
var newinitial;
var start;
var length;
var end;
var x;
var now;
var remaining;
var minutes;
var seconds;
var d;
var i;
var left;
var right;
var line = [];
var slice;
var pauseTime;
var pauseLength;
var alert = new Audio('alert.mp3');

$("#pause").hide(); // hide pause button by default

// show default pomodoro value when page is loaded
$(document).ready(function (){
    tf = 25;
    $('#display').html('25:00');});

// show default values for short break and long break
function display () {
   if (tf < 10) {
    $('#display').empty().html('0' + tf + ':00');
   } else {
    $('#display').empty().html(tf + ':00');}
}

// button to pomodoro timer
$('#pom').on('click', function() {
  tf = 25;
  display();
  clearInterval(x);
  $('#pause').hide();
  $('#play').show();
});

// button to short break
$('#short').on('click',function() {
    tf = 05 ;
    display();
    clearInterval(x);
    $('#pause').hide();
    $('#play').show();
});

// button to long break
$('#long').on('click',function() {
    tf = 15;
    display();
    clearInterval(x);
    $('#pause').hide();
    $('#play').show();
});


    // update the count down every 1 second
    function a () {
        x = setInterval(function () {

            // get the time when the user clicks
            now = $.now();
            newinitial = tf;

            // find the distance between now and the count down time

            remaining = end - now;

            // time calculations for days, hours, minutes and seconds
            minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.round((remaining % (1000 * 60)) / 1000);

            // display the result in the element with id="demo"

            if (seconds == 60) {
                document.getElementById("display").innerHTML = "01:00";
            } else if (seconds < 10 && minutes < 10 ) {
                document.getElementById("display").innerHTML = "0" + minutes + ":0" + seconds;
            } else if (minutes < 10 ) {
                document.getElementById("display").innerHTML = "0" + minutes + ":" + seconds;
            } else if (seconds < 10) {
                document.getElementById("display").innerHTML = minutes + ":0" + seconds;
            } else {
                document.getElementById("display").innerHTML = minutes + ":" + seconds;}


            // if the count down is finished, remain at zero
            if (remaining < 0) {
                $('#display').empty().html('00:00');
                alert.play();
                // clearInterval(x);
                // document.getElementById("display").innerHTML = "END";
            }

        }, 1000);

    }

// user to start or resume
$('#play').on('click', function () {

// to start
     if (isNaN(pauseTime)) {
         start = $.now();
         length = tf * 60 * 1000;
         end = start + length;
         a();
     }

// to resume
     else {
         start = $.now();
         end = start + pauseLength;
         a();
     }

     $('#play').hide();
     $('#pause').show();

 });

 // user to pause
 $('#pause').on('click', function () {
     pauseTime = $.now();
     pauseLength = end - pauseTime;
     clearInterval(x);
     $('#pause').hide();
     $('#play').show();

 });

    // user to reset
    $('#reset').on('click',function() {
        clearInterval(x);
        tf = newinitial;
        display();
        pauseTime = NaN;
        $('#pause').hide();
        $('#play').show();
    });

