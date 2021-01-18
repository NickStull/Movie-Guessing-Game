$(document).foundation();

let storedScore = 17;
let userScore = 18;

if (userScore > storedScore) {
    $("#exampleModal1").foundation("open");
}
// let h1Tag = $("<h1>");
// h1Tag.text("Awesome. I have it.");
// $("#exampleModal1").append(h1Tag);

let highscores = ["Tim Martin: 30", "Jimi Simon: 30", "Derek Bardini: 30", "Nick Stull: 30", "Aubrey Plaza: 24", "Morgan Freeman: 22", "Olivia Munn: 21", "Jim Carrey: 20", "Ryan Reynolds: 20", "Will Smith: 18"];
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
    starCardText.text(highscores[i]);
    
    myGrid.append(cardContainer);
    cardContainer.append(starCard);
    starCard.append(starImage);
    cardContainer.append(starCardText);
}



