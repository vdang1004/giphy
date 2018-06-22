$(document).ready(function() {
    
    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird"];
    
    function displayButtons(){
        $("#gifButtonsArea").empty(); // erasing div contents so that it doesnt duplicate results
        for (var i = 0; i < animals.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("animal");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#gifButtonsArea").append(gifButton);
        }
    }

    function addNewAnimal(){
        $("#addAnimal").on("click", function(){
        var animal = $("#animal-input").val().trim();
        if (animal == ""){
            return false
        }
        animals.push(animal);
        displayButtons();
        event.preventDefault()
        });
    }    

    function displayGifs(){
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=1CwhJMxrZpCl5Hu14Cjh0nGKFQOhxU96&limit=10";
        console.log(queryURL); // displays url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            $("#gifArea").empty(); 
            var results = response.data; //assign data to variable
            console.log(results); //log results
            for (var i=0; i<results.length; i++){
                var gifDiv = $("<div>"); //div for gifs
                gifDiv.addClass("gifDiv");
                // pull rating
                var rating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(rating);
                // pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small.url); // still image stored into src of image
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifArea").prepend(gifDiv);
            }
        });
    }

    displayButtons();
    addNewAnimal();
    $(document).on("click", ".animal", displayGifs);
});