movieList = [
    "the shawshank redemption", "the godfather", "the dark knight", "schindler's list", "pulp fiction", "forrest gump", "inception", "goodfellas", "the green mile", "the silence of the lambs", "se7en", "seven samurai", "the matrix", "spirited away", "saving private ryan", "interstellar", "parasite", "the usual suspects", "the lion king", "the pianist", "back to the future", "american history x", "psycho", "gladiator", "casablanca", "rear window", "alien", "apocalypse now", "indiana jones and the raiders of the lost ark", "django unchained", "wall e", "the shining", "avengers: infinity wars", "sunset blvd", "oldboy", "princess mononoke", "spider-man: into the spider-verse", "dr. strangelove or: how i learned to stop worrying and love the bomb", "your name.", "coco", "avengers: endgame", "american beauty", "braveheart", "toy story", "amadeus", "inglourious basterds", "good will hunting", "star wars: episode iv - a new hope", "it's a wonderful life", "the prestige", "the departed", "hamilton", "aliens", "das boot", "star wars: episode vi - return of the jedi", "reservoir dogs", "2001: a space odyssey", "requiem for a dream", "vertigo", "eternal sunshine of the spotless mind", "citizen kane", "full metal jacket", "singin' in the rain", "north by northwest", "snatch", "a clockwork orange", "1917", "scarface", "taxi driver", "lawrence of arabia", "toy story 3", "amelie", "the sting", "up", "indiana jones and the last crusade", "heat", "l.a. confidential", "die hard", "green book", "monty python and the holy grail", "yojimbo", "children of heaven", "unforgiven", "howl's moving castle", "a beautiful mind", "casino", "the great escape", "the wolf of wall street", "pan's labyrinth", "the secret in their eyes", "there will be blood", "lock, stock and two smoking barrels", "my neighbor totoro", "the treasure of the sierra madre", "dial m for murder", "three billboards outside ebbing, missouri", "shutter island", "no country for old men", "v for vendetta", "the sixth sense",
]
var movieTitle = movieList[Math.floor(math.random() * movieList.length)];
var container = $(".container");
var APIKey = ""
var score = 10

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

    // set all except #1 as hidden
    for (let i = 0; i < hintArr.length; i++) {

        // Hide them all
        $(`#hint${i + 1}`).attr("style", "visibility: hidden;");// Put this hints into the list
        $(`#hint${i + 1}`).text(hintArr[i]);

    }

    var timeInterval = setInterval(function () {
        // Show the time remaining in the upper right corner
        timer.text(`Time Remaining: ${timeLeft}`);
        // If less than 10 seconds change text to red and weight to bold
        switch (timeLeft) {
            case 45: $("#hint1").attr("style", "visibility: visible;");
                break;
            case 40: $("#hint2").attr("style", "visibility: visible;");
                break;
            case 35: $("#hint3").attr("style", "visibility: visible;");
                break;
            case 30: $("#hint4").attr("style", "visibility: visible;");
                break;
            case 25: $("#hint5").attr("style", "visibility: visible;");
                break;
            case 20: $("#hint6").attr("style", "visibility: visible;");
                break;
            case 15: $("#hint7").attr("style", "visibility: visible;");
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


function gameOver() {
    var endingDiv = $("<div>");
    endingDiv.attr("id", "endingDiv");
    container.prepend(endingDiv);
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${movieTitle}&api_key=${APIKey}&limit=3`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response)

            for (var i = 0; i < results.length; i++) {

                var movieGif = $("<img>");
                movieGif.attr("src", results[i].images.fixed_height.url);

                endingDiv.prepend(movieGif);
            }
        });

    var scoreDiv = $("<h1>");
    scoreDiv.attr("id", "finalScore")
    scoreDiv.text("GAME OVER! Your Score: " + score)
    container.prepend(scoreDiv);

}

gameOver();
