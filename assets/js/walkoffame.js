$(document).foundation();

let storedScore = 17;
let userScore = 18;

if (userScore > storedScore) {
    $("#topScoreModal").foundation("open");

}
// let h1Tag = $("<h1>");
// h1Tag.text("Awesome. I have it.");
// $("#exampleModal1").append(h1Tag);

let highscores = [
    {
        name: "Tim Martin",
        score: 30
    },
    {
        name: "Jimi Simon",
        score: 30
    },
    {
        name: "Derek Bardini",
        score: 30
    },
    {
        name: "Nick Stull",
        score: 30
    },
    {
        name: "Aubrey Plaza",
        score: 28
    },
    {
        name: "Morgan Freeman",
        score: 22
    },
    {
        name: "Olivia Munn",
        score: 21
    },
    {
        name: "Jim Carrey",
        score: 20
    },
    {
        name: "Ryan Reynolds",
        score: 20
    },
    {
        name: "Will Smith",
        score: 18
    }
];

let myGrid = $("#my-grid");

for (let i = 0; i < highscores.length; i++) {
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
    starCardText.text(`${highscores[i].name}: ${highscores[i].score}`);
    
    myGrid.append(cardContainer);
    cardContainer.append(starCard);
    starCard.append(starImage);
    cardContainer.append(starCardText);
}

// Clear the textbox when clicked
$("#userName").focus(function() { 
    $(this).val(""); 
} );

