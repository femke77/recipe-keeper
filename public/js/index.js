//javascript for the landing page

// On Search Click
$("#searchButton").on("click", function () {
    console.log("button works");

    // Grab input from search
    var keyword = $("#searchInput")
        .val()
        .trim();
    console.log(keyword);

    // // Send the PUT request.
    $.ajax("/api/search/" + keyword, {
        type: "GET"
    }).then(function (response) {
        $("#recipesBody").empty();

        // Recipe Response setting to 3
        // var recipeCount = 3;

        // if (response.length < 3) {
        //     recipeCount = response.length;
        // }

        for (let i = 0; i < response.length; i++) {
            const element = response[i];

            // Append them to drink list
            $("#recipesBody").append(
                // Dynamically creates cards using ES6 (ECMAscript 6), which doesn't require template literals
                `<div class="column is-one-third">
                <div class="card large">
                    <div class="card-image">
                        <figure class="image">
                            <!-- image  -->
                            <img src="${element.image}" />
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4 no-padding">
                                    ${element.title}
                                </p>
                                <p class="subtitle is-6">Dish type: ${element.dishType}</p>
                            </div>
                        </div>
                        <div class="content">
                            <p>Serves: ${element.servings}</p>

                        </div>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Save Recipe</a>
                </footer>
            </div>`
            );
        }

        console.log(recipeCount);
        console.log(response);
        console.log(`id ${response[0].id}`);
    });
});
