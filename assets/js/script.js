var movieList = [
    "the shawshank redemption", "the godfather", "the dark knight", "schindler's list", "pulp fiction", "forrest gump", "inception", "goodfellas", "the green mile", "the silence of the lambs", "se7en", "seven samurai", "the matrix", "spirited away", "saving private ryan", "interstellar", "parasite", "the usual suspects", "the lion king", "the pianist", "back to the future", "american history x", "psycho", "gladiator", "casablanca", "rear window", "alien", "apocalypse now", "indiana jones and the raiders of the lost ark", "django unchained", "wall e", "the shining", "avengers: infinity war", "sunset blvd", "oldboy", "princess mononoke", "spider-man: into the spider-verse", "dr. strangelove or: how i learned to stop worrying and love the bomb", "your name.", "coco", "avengers: endgame", "american beauty", "braveheart", "toy story", "amadeus", "inglourious basterds", "good will hunting", "star wars: episode iv - a new hope", "it's a wonderful life", "the prestige", "the departed", "hamilton", "aliens", "das boot", "star wars: episode vi - return of the jedi", "reservoir dogs", "2001: a space odyssey", "requiem for a dream", "vertigo", "eternal sunshine of the spotless mind", "citizen kane", "full metal jacket", "singin' in the rain", "north by northwest", "snatch", "a clockwork orange", "1917", "scarface", "taxi driver", "lawrence of arabia", "toy story 3", "amelie", "the sting", "up", "indiana jones and the last crusade", "heat", "l.a. confidential", "die hard", "green book", "monty python and the holy grail", "yojimbo", "children of heaven", "unforgiven", "howl's moving castle", "a beautiful mind", "casino", "the great escape", "the wolf of wall street", "pan's labyrinth", "the secret in their eyes", "there will be blood", "lock, stock and two smoking barrels", "my neighbor totoro", "the treasure of the sierra madre", "dial m for murder", "three billboards outside ebbing, missouri", "shutter island", "no country for old men", "v for vendetta", "the sixth sense",
]
var movieTitle = movieList[Math.floor(Math.random() * movieList.length)];
var container = $(".container");
var omdbAPIKey = ""
var giphyAPIKey = ""
var score = 10
var movieInfo = {}


var timer = $("#timer");

$.ajax({
    url: `http://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbAPIKey}`,
    method: "GET",
    async: false,
}).then(function (response) {
    movieInfo = response
    console.log(movieInfo.Title)
    hintTimer();

});

//guess logic
//whole thing needs to run on click
//this need to be directed to the submit text field

$("#next-clue").click(function () {
    var userGuess = movieInfo.Title;
    console.log(userGuess);

    $.ajax({
        url: `http://www.omdbapi.com/?s=${userGuess}&type=movie&apikey=${omdbAPIKey}`,
        method: "GET"
    }).then(function (response2) {
        console.log(response2.Search[0].imdbID)
        console.log(movieInfo.imdbID)
        console.log(response2.Search[0].imdbID == movieInfo.imdbID);
        if (response2.Search[0].imdbID === movieInfo.imdbID) {
            //test script
            alert("you win")
        }
    });
});


function hintTimer() {

    let timeLeft = 45;

    if (hintNum === 0) {
        console.log("Genre: " + movieInfo.Genre);
    }

    var timeInterval = setInterval(function () {
        // Show the time remaining in the upper right corner
        timer.text(`Time Remaining: ${timeLeft}`);
        // console countdown
        // console.log(timeLeft)
        // If less than 10 seconds change text to red and weight to bold
        switch (timeLeft) {
            case 45: console.log(movieInfo.Genre);
                break;
            case 40: console.log(movieInfo.Released);
                break;
            case 35: console.log(movieInfo.Rated);
                break;
            case 30: console.log(movieInfo.Production);
                break;
            case 25: console.log(movieInfo.Director);
                break;
            case 20: console.log(movieInfo.Actors);
                break;
            case 15: console.log(movieInfo.Plot);
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

    }, 1000);

}

function loadNextQuestion() {
    // console.log("next-question")
    //adds 1 to hint num
    hintNum++
    //checks to see wh
    switch (hintNum) {
        case 1: console.log("Release Date: " + movieInfo.Released);
            break;
        case 2: console.log("Rated: " + movieInfo.Rated);
            break;
        case 3: console.log("Produced by: " + movieInfo.Production);
            break;
        case 4: console.log("Directed by: " + movieInfo.Director);
            break;
        case 5: console.log("Actors: " + movieInfo.Actors);
            break;
        case 6: console.log("Plot: " + movieInfo.Plot);
            break;
    }
}


// Function below saved for later
// function gameOver() {
//     var endingDiv = $("<div>");
//     endingDiv.attr("id", "endingDiv");
//     container.prepend(endingDiv);
//     var queryURL = `https://api.giphy.com/v1/gifs/search?q=${movieTitle}&api_key=${giphyAPIKey}&limit=3`;

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         .then(function (response) {
//             var results = response.data;
//             console.log(response)

//             for (var i = 0; i < results.length; i++) {

//                 var movieGif = $("<img>");
//                 movieGif.attr("src", results[i].images.fixed_height.url);

//                 endingDiv.prepend(movieGif);
//             }
//         });

//     var scoreDiv = $("<h1>");
//     scoreDiv.attr("id", "finalScore")
//     scoreDiv.text("GAME OVER! Your Score: " + score)
//     container.prepend(scoreDiv);

// }

// gameOver();


//SAVING THIS BELOW IN CASE IT IS NEEDED.
// at the moment I don't believe we will need this functionality any more.

// console countdown
        // console.log(timeLeft)
        // If less than 10 seconds change text to red and weight to bold
        // switch (timeLeft) {
        //     case 45: console.log(movieInfo.Genre);
        //         break;
        //     case 40: console.log(movieInfo.Released);
        //         break;
        //     case 35: console.log(movieInfo.Rated);
        //         break;
        //     case 30: console.log(movieInfo.Production);
        //         break;
        //     case 25: console.log(movieInfo.Director);
        //         break;
        //     case 20: console.log(movieInfo.Actors);
        //         break;
        //     case 15: console.log(movieInfo.Plot);
        //         break;
        // }

         // set all except #1 as hidden
    // for (let i = 0; i < hintArr.length; i++) {

    //     // Hide them all
    //     $(`#hint${i + 1}`).attr("style", "visibility: hidden;");// Put this hints into the list
    //     $(`#hint${i + 1}`).text(hintArr[i]);

    // }
