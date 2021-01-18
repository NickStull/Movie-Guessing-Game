$(document).foundation();

let topScores = [];
let userScore;

// Initial load of document
$( document ).ready(function() {
    // Grab the current array from local storage
    topScores = JSON.parse(localStorage.getItem("savedScores"));
    // Grab the current user score from local storage
    userScore = JSON.parse(localStorage.getItem("movieIQScore"));
    // Reset local storage to zero
    localStorage.setItem("movieIQScore", JSON.stringify(0));
    
    // If there is persistent data, compare the last entry to the users score
    if (topScores) { 
        if (userScore > topScores[topScores.length - 1].score) {
            //Pop modal
            $("#topScoreModal").foundation("open");
        }
        renderStars();
    }
    // If there is no persistent data, the user is in the top ten
    else if (userScore > 0) { 
        $("#topScoreModal").foundation("open"); 
    }
        
}); 

function renderStars() {
    let myGrid = $("#my-grid");
    myGrid.html("");

    for (let i = 0; i < topScores.length; i++) {
        // Container to hold the cards
        let cardContainer = $("<div>");
        cardContainer.addClass("card-container");
        // The star cards
        let starCard = $("<div>");
        starCard.addClass("star-card");
        // The star image
        let starImage = $("<img>");
        starImage.attr("src", "./assets/images/walkofFameStar.jpg");
        starImage.attr("alt", "Walk of Fame star");
        // The name and score text
        let starCardText = $("<div>");
        starCardText.addClass("star-card-text");
        starCardText.text(`${topScores[i].name}: ${topScores[i].score}`);
        // Append-fest
        myGrid.append(cardContainer);
        cardContainer.append(starCard);
        starCard.append(starImage);
        cardContainer.append(starCardText);
    }
}

// Search button function
$("#enter-button").on("click", function(event) {
    event.preventDefault();

    // Get user name
    let userName = $("#user-name").val().trim();

    // Put the userName and userScore into an object
    let highscore = {
        name: userName,
        score: userScore
    };
    // If the local array is not empty
    if (topScores) {
        // If the array is 10, pop the smallest score
        if (topScores.length === 10) {
            topScores.pop();
        }
        // Push the user info into the array
        topScores.push(highscore);
        // Sort it by score
        topScores.sort(function(a, b) {
            return b.score - a.score;
        });
    }
    else {
        // Local array is empty so put in the newest score
        topScores = [highscore];
    }
    // Store the array locally
    localStorage.setItem("savedScores", JSON.stringify(topScores));
    renderStars();
    
});

// Clear the textbox when clicked
$("#user-name").focus(function() { 
    $(this).val(""); 
} );

renderStars();
