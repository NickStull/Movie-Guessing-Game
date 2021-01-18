var movieList = [
    "the shawshank redemption", "the godfather", "the dark knight", "schindler's list", "pulp fiction", "forrest gump", "inception", "goodfellas", "the green mile", "the silence of the lambs", "se7en", "seven samurai", "the matrix", "spirited away", "saving private ryan", "interstellar", "parasite", "the usual suspects", "the lion king", "the pianist", "back to the future", "american history x", "psycho", "gladiator", "casablanca", "rear window", "alien", "apocalypse now", "indiana jones and the raiders of the lost ark", "django unchained", "wall e", "the shining", "avengers: infinity war", "sunset blvd", "oldboy", "princess mononoke", "spider-man: into the spider-verse", "dr. strangelove or: how i learned to stop worrying and love the bomb", "your name.", "coco", "avengers: endgame", "american beauty", "braveheart", "toy story", "amadeus", "inglourious basterds", "good will hunting", "star wars: episode iv - a new hope", "it's a wonderful life", "the prestige", "the departed", "hamilton", "aliens", "das boot", "star wars: episode vi - return of the jedi", "reservoir dogs", "2001: a space odyssey", "requiem for a dream", "vertigo", "eternal sunshine of the spotless mind", "citizen kane", "full metal jacket", "singin' in the rain", "north by northwest", "snatch", "a clockwork orange", "1917", "scarface", "taxi driver", "lawrence of arabia", "toy story 3", "amélie", "the sting", "indiana jones and the last crusade", "heat", "l.a. confidential", "die hard", "green book", "monty python and the holy grail", "yojimbo", "children of heaven", "unforgiven", "howl's moving castle", "a beautiful mind", "casino", "the great escape", "the wolf of wall street", "pan's labyrinth", "the secret in their eyes", "there will be blood", "lock, stock and two smoking barrels", "my neighbor totoro", "the treasure of the sierra madre", "dial m for murder", "three billboards outside ebbing, missouri", "shutter island", "no country for old men", "v for vendetta", "the sixth sense", "the princess bride",
]
var movieTitle = movieList[Math.floor(Math.random() * movieList.length)];
// var container = $(".container");
var omdbAPIKey = ""
var giphyAPIKey = ""
var score = 0;
var movieInfo = {}
var hintNum = 0
var clicks = 0
var correctGuess = false;

var timer = $("#game-timer");

$.ajax({
    url: `http://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbAPIKey}`,
    method: "GET",
}).then(function (response) {
    movieInfo = response
    // console.log(movieInfo.Title)
    hintTimer();

});



$("#guessButton").click(guessTrigger);

$("#guessInput").keypress(function (event) {

    if (event.which === 13) {
        guessTrigger();
    };
});



function guessTrigger() {

    var userGuess = $("#guessInput").val().trim();

    $.ajax({
        url: `http://www.omdbapi.com/?s=${userGuess}&type=movie&apikey=${omdbAPIKey}`,
        method: "GET"
    }).then(function (response2) {

        // bounce and clear for no search results
        if (response2.Error == "Movie not found!") {
            $("#guessInput").val("")
            $("#guessInput").effect("shake");
        }

        if (response2.Search[0].imdbID === movieInfo.imdbID) {
            correctGuess = true;
            console.log("Win score: " + score);
            localStorage.setItem("movieIQScore", JSON.stringify(score));
            var cardContainer = $("#cardContainer")
            var cell = $("<div>");
            cell.attr("class", "cell small-12 medium-8 large-6 my-cell");
            var card = $("<div>");
            card.attr("class", "card my-card");
            card.attr("style", "width: 100%");
            var endCard = $("<div>"); //clueType
            endCard.attr("class", "card-divider my-card-divider");
            endCard.attr("id", "endCard"); // "GAME OVER!"
            var endContent = $("<div>"); //clueContent
            endContent.attr("class", "card-section my-card-section");
            endContent.attr("id", "endContent");
            var endH1 = $("<H1>"); // The movie was: xxxx
            var endH2 = $("<H2>"); // Your score: xxxx
            // removes the guess and hint input;
            $("li:nth-child(2)").remove();
            $("li:nth-child(2)").remove();
            cardContainer.prepend(cell);
            cell.append(card);
            card.append(endCard);
            card.append(endContent);
            endContent.append(endH1);
            endContent.append(endH2);
            endCard.text("You Win");
            endH1.text("That's right! the movie is " + movieInfo.Title);
            endH2.text("You did it!");
            var buttonDiv = $("<div>");
            buttonDiv.attr("class", "button-group");
            buttonDiv.attr("id", "buttonDiv");
            endContent.append(buttonDiv);
            var hsButton = $("<a>");
            hsButton.attr("class", "button");
            hsButton.attr("id", "hsButton");
            hsButton.attr("href", "walkoffame.html")
            hsButton.text("Walk of Fame")
            buttonDiv.append(hsButton);
            var retryButton = $("<a>");
            retryButton.attr("class", "button");
            retryButton.attr("id", "retryButton");
            retryButton.attr("href", "javascript:window.location.reload()");
            retryButton.text("Retry Game");
            buttonDiv.append(retryButton);
            $("#guessButton").off();
            $("#guessInput").off();
            $("#next-clue").data("state", "inactive");

            $.ajax({
                url: `https://api.giphy.com/v1/gifs/search?q=${movieTitle}&api_key=${giphyAPIKey}&limit=3`,
                method: "GET"
            }).then(function (memes) {
                var results = memes.data;

                for (var i = 0; i < results.length; i++) {

                    var movieGif = $("<img>");
                    movieGif.attr("src", results[i].images.fixed_height.url);

                    endContent.append(movieGif);
                }
            });



        }

        else {
            $("#guessInput").val("")
            $("#guessInput").effect("shake");
        }
    });
};


function hintTimer() {

    let timeLeft = 45;
    score = 100;
    if (hintNum === 0) {
        $("#clue-type0").text("Genre:");
        $("#clue-content0").text(movieInfo.Genre)
    }

    var timeInterval = setInterval(function () {
        // Show the time remaining in the upper right corner
        timer.text("Time Remaining: " + timeLeft)
        //reduce score and timer by 1



        if (timeLeft < 11 && timeLeft > 0) {
            timer.attr("style", "color: red; font-weight: bold;")
        }

        if (correctGuess === true) {
            clearInterval(timeInterval);
        }
        // Game over if timer runs out or all questions are answered
        else if (timeLeft === 0) {
            // Stop the timer
            console.log("Answer: " + movieInfo.Title)
            timer.text("Time Remaining: " + timeLeft)
            clearInterval(timeInterval);
            gameOver();
        }
        score--
        timeLeft--;

    }, 1000);
}



function loadNextHint() {
    //adds 1 to hint num
    console.log($("#next-clue").data("state"))
    if ($("#next-clue").data("state") != "inactive") {
        hintNum++
        var cardContainer = $("#cardContainer")
        var cell = $("<div>");
        cell.attr("class", "cell small-12 medium-8 large-6 my-cell");
        var card = $("<div>");
        card.attr("class", "card my-card");
        card.attr("style", "width: 100%");
        var clueType = $("<div>");
        clueType.attr("class", "card-divider my-card-divider");
        clueType.attr("id", "clue-type" + hintNum);
        var clueContent = $("<div>");
        clueContent.attr("class", "card-section my-card-section");
        clueContent.attr("id", "clue-content" + hintNum);
        var clueParagraph = $("<p>")
        cardContainer.prepend(cell);
        cell.append(card);
        card.append(clueType);
        card.append(clueContent);
        clueContent.append(clueParagraph);
        // console.log("next-question")


        switch (hintNum) {
            case 1: clueType.text("Release Date:");
                clueParagraph.text(movieInfo.Released);
                score -= 5;
                break;
            case 2: clueType.text("Rated:");
                clueParagraph.text(movieInfo.Rated);
                score -= 5;
                break;
            case 3: clueType.text("Produced By:");
                clueParagraph.text(movieInfo.Production);
                score -= 5;
                break;
            case 4: clueType.text("Directed By:");
                clueParagraph.text(movieInfo.Director);
                score -= 5;
                break;
            case 5: clueType.text("Actors:");
                clueParagraph.text(movieInfo.Actors);
                score -= 5;
                break;
            case 6: clueType.text("Plot:");
                clueParagraph.text(movieInfo.Plot);
                score -= 5;
                break;
            case 7: clueType.text("No more clues!");
                clueParagraph.text("🙃");
                break;
            case 8: clueType.text("What were you expecting?");
                clueParagraph.text("No more!");
                break;
            case 9: clueType.text("bruh");
                clueParagraph.text("😂");
                break;
            case 10: clueType.text("Here's a hint:");
                clueParagraph.text("It's a movie.");
                break;
            case 11: clueType.text("OK. Fine. New game:");
                clueParagraph.text("How many clicks can you get before the timer runs out?");
                break;
            default: clicks++
                clueType.text("clicks:");
                clueParagraph.text(clicks);
                break;
        }
    }
}

// End card for running out of time.
function gameOver() {
    score = 0;
    localStorage.setItem("movieIQScore", JSON.stringify(score));
    $("#guessButton").off();
    $("#guessInput").off();
    $("#next-clue").data("state", "inactive");
    var cardContainer = $("#cardContainer");
    var cell = $("<div>");
    cell.attr("class", "cell small-12 medium-8 large-6 my-cell");
    var card = $("<div>");
    card.attr("class", "card my-card");
    card.attr("style", "width: 100%");
    var endCard = $("<div>"); //clueType
    endCard.attr("class", "card-divider my-card-divider");
    endCard.attr("id", "endCard"); // "GAME OVER!"
    var endContent = $("<div>"); //clueContent
    endContent.attr("class", "card-section my-card-section");
    endContent.attr("id", "endContent");
    var endH1 = $("<H1>"); // The movie was: xxxx
    var endH2 = $("<H2>"); // Your score: xxxx
    cardContainer.prepend(cell);
    cell.append(card);
    card.append(endCard);
    card.append(endContent);
    endContent.append(endH1);
    endContent.append(endH2);
    endCard.text("Game Over!");
    endH1.text("The movie was " + movieInfo.Title);
    endH2.text("Better luck next time!");
    var buttonDiv = $("<div>");
    buttonDiv.attr("class", "button-group");
    buttonDiv.attr("id", "buttonDiv");
    endContent.append(buttonDiv);
    var hsButton = $("<a>");
    hsButton.attr("class", "button");
    hsButton.attr("id", "hsButton");
    hsButton.attr("href", "walkoffame.html")
    hsButton.text("Walk of Fame")
    buttonDiv.append(hsButton);
    var retryButton = $("<a>");
    retryButton.attr("class", "button");
    retryButton.attr("id", "retryButton");
    retryButton.attr("href", "javascript:window.location.reload()");
    retryButton.text("Retry Game")
    buttonDiv.append(retryButton);

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${movieTitle}&api_key=${giphyAPIKey}&limit=3`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            // console.log(response)


            for (var i = 0; i < results.length; i++) {

                var movieGif = $("<img>");
                movieGif.attr("src", results[i].images.fixed_height.url);

                endContent.append(movieGif);
            }
        });

    console.log($("#next-clue").data("state"))

}
$("#next-clue").on("click", loadNextHint);
