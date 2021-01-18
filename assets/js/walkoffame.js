$(document).foundation();

let topScores = [];

// Initial load of document
$( document ).ready(function() {
    // Grab the current array from local storage
    topScores = JSON.parse(localStorage.getItem("savedScores"));
    
    // If there is persistent data, compare the last entry to the users score
    if (topScores) { 
        if (score > topScores[topScores.length - 1].score) {
            console.log("Top scores");
            //Pop modal
            $("#topScoreModal").foundation("open");
        }
        renderStars();
    }
    // If there is no persistent data, the user is in the top ten
    else { 
        console.log("No top scores");
        $("#topScoreModal").foundation("open"); 
    }
        
}); 

function renderStars() {
    let myGrid = $("#my-grid");
    myGrid.html("");

    for (let i = 0; i < topScores.length; i++) {
        let cardContainer = $("<div>");
        cardContainer.addClass("card-container");
        
        let starCard = $("<div>");
        starCard.addClass("star-card");
        
        let starImage = $("<img>");
        starImage.attr("src", "./assets/images/walkofFameStar.jpg");
        starImage.attr("alt", "Walk of Fame star");
        console.log(starImage);
        
        let starCardText = $("<div>");
        starCardText.addClass("star-card-text");
        starCardText.text(`${topScores[i].name}: ${topScores[i].score}`);
        
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
    console.log(userName);

    let highscore = {
        name: userName,
        score: score
    };

    if (topScores) {
        if (topScores.length === 10) {
            topScores.pop();
        }
        topScores.push(highscore);
        topScores.sort(function(a, b) {
            return b.score - a.score;
        });
    }
    else {
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
