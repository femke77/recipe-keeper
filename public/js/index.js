/* eslint-disable prettier/prettier */
//javascript for the landing page
$(document).ready(function () {
  // On Search Click
  $("#searchButton").on("click", function () {
    console.log("search works");

    // Grab input from search
    var keyword = $("#searchInput")
      .val()
      .trim();
    console.log(keyword);

    // // Send the GET request.
    $.ajax("/api/search/" + keyword, {
      type: "GET"
    }).then(function (response) {
      $("#recipesBody").empty();

      for (let i = 0; i < response.length; i++) {
        const element = response[i];

        // Append them to drink list
        $("#recipesBody").append(
          `<div class="column is-one-third recipe-card" id="${element.title}">
                <div class="card large ">
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
        $(".recipe-card").data("recipe", element);
      }
    });
  });
  // End Search Click

  // Start Card Click to display recipe
  $(document.body).on("click", ".recipe-card", function () {
    console.log("card clicking works");
    var keyword = this.getAttribute("id");
    console.log(`id: ${keyword}`);

    // Send the PUT request.
    $.ajax("/api/search/" + keyword, {
      type: "GET"
    }).then(function (response) {
      $("#recipesBody").empty();
      console.log("empty successful");
      const element = response[0];

      // Append them to drink list
      $("#recipesBody").append(
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
      console.log("append successful");
    });
  });
});
