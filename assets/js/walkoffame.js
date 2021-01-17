//<div class="card-container">
//     <div class="star-card">
//         <img src="./assets/images/walkofFameStar.jpg" alt="Walk of fame star">
//     </div>
//     <div class="star-card-text">Tim Martin: 20</div>
// </div>
let highscores = ["Tim Martin: 30", "Jimi Simon: 30", "Derek Bardini: 30", "Nick Stull: 30"];
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



