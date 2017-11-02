
$(document).ready(function() {

  //movies array

    var topics = ["John Wick", "You've Got Mail", "Atomic Blonde", "Kingsman", "Iron Man", "The Bourne Identity", "Wonder Woman", "Jaws", "The Dark Knight"];

    

    function displayInfo() {
        var movie = $(this).attr("movie-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=ywJjNvAvsbKcdDazl7kOMTdRSioIJqGk&limit=10";

        //Call

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {


            $("#movies").empty();

            var results = response.data;

            //for loop of movie array

            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div class='userMovie'>");


                var rating = results[i].rating;
                var Rate = $("<p>").text("Rating: " + rating);

                //make variables for still url and animated url

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;


                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                //append the gif and rating to the new div created during for loop

                movieDiv.append(gif);
                movieDiv.append(Rate);

                //append all for loop created divs

                $("#movies").append(movieDiv);
            }

            // click to animate and click again to pause gif

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }


    function renderButtons() {

        //delete original array of gifs so they don't repeat

        $("#movieButtons").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var movieRender = $("<button>");


            movieRender.addClass("movie");
            movieRender.attr("movie-name", topics[i]);
            movieRender.text(topics[i]);
            $("#movieButtons").append(movieRender);
        }
    }

    //on click event to add an additional movie button when submitted
    // push input to array

    $("#addMovie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();

        topics.push(movie);
            $("#movie-input").val(" ");
        renderButtons();
    });


    $(document).on("click", ".movie", displayInfo);

    //run function to display all buttons on startup
    renderButtons();

});
