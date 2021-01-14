var hintArr = [
    "1996", 
    "Animation",
    "Joe Pytka",
    "$90,418,342",
    "Leo Benvenuti, Steve Rudnick, Timothy Harris, Herschel Weingrod",
    "Michael Jordan, Wayne Knight, Theresa Randle, Manner Washington", 
    "In a desperate attempt to win a basketball match and earn their freedom, the Looney Tunes seek the aid of retired basketball champion, Michael Jordan"
]

var timer = $("#timer");

function hintTimer() {

    let timeLeft = 45;
    // Populate the list
    console.log(hintArr[0]);

    // set all except #1 as hidden
    for (let i = 0; i < hintArr.length; i++) {
        
        // Hide them all
        $(`#hint${i+1}`).attr("style", "visibility: hidden;");// Put this hints into the list
        $(`#hint${i+1}`).text(hintArr[i]);
        
    }

    var timeInterval = setInterval(function() {
        // Show the time remaining in the upper right corner
        timer.text(`Time Remaining: ${ timeLeft }`);
        // If less than 10 seconds change text to red and weight to bold
        switch (timeLeft) {
            case 45:    $("#hint1").attr("style", "visibility: visible;");
                        break;
            case 40:    $("#hint2").attr("style", "visibility: visible;");
                        break;
            case 35:    $("#hint3").attr("style", "visibility: visible;");
                        break;
            case 30:    $("#hint4").attr("style", "visibility: visible;");
                        break;
            case 25:    $("#hint5").attr("style", "visibility: visible;");
                        break;
            case 20:    $("#hint6").attr("style", "visibility: visible;");
                        break;
            case 15:    $("#hint7").attr("style", "visibility: visible;");
                        break;            
        }

        if (timeLeft < 10 && timeLeft > 0) {
            timer.attr("style", "color: red; font-weight: bold;")
        }    
        // Game over if timer runs out or all questions are answered
        else if (timeLeft === 0) { 
            // Stop the timer
            clearInterval(timeInterval);
            
        }
        timeLeft--;

    }, 1000);
            
}

hintTimer();
