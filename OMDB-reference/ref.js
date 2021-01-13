var container = $(".container")
var table = $(".table")
var movie = "Space Jam";
var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    console.log(response)
    console.log(response.Ratings)
    console.log(response.Ratings[0].Source + ": " + " " + response.Ratings[0].Value)

    for (i = 0; i < Object.keys(response).length; i++) {
        var row = $("<tr>");
            table.append(row);
        var keyData = $("<td>");
            keyData.text(Object.keys(response)[i]);
            row.append(keyData)
        var valueData = $("<td>");
            valueData.text(Object.values(response)[i]);
            row.append(valueData);
    }
    
});