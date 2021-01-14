var movieTitle = "Space Jam";
var container = $(".container");
var APIKey = "ty0YVPz0Fq0MudSDkY5wN7tltSStxsxi"
var score = 10

function gameOver (){
    var endingDiv = $("<div>");
    endingDiv.attr("id", "endingDiv");
    container.prepend(endingDiv);
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${movieTitle}&api_key=${APIKey}&limit=3`;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
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