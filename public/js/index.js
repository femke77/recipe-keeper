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
      // console.log(element.ingredients);

      // Handling ingredients list 
      const valuesIng = Object.values(element.ingredients);
      console.log("values: " + valuesIng);
      console.log(valuesIng.length);

      // Handling Directions
      // const valuesDir = Object.values(element.Directions)
      console.log(element.instructions);

      // Append them to food list
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
            </div>
        </div>

        <!-- Card two -->
        <div class="column is-one-third">
            <div class="card large">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4 no-padding">Ingredients</p>
                            <hr>
                        </div>
                    </div>
                    <div class="content">
                        <ul id="recList">
          </ul >
                    </div >
                </div >
            </div >
        </div >

    <div class="column is-one-third">
      <div class="card large">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4 no-padding">Directions</p>
              <hr>
                        </div>
            </div>
            <div class="content" id="recDirections">
              <ol>
${element.instructions}
              </ol>
            </div>
            <iframe width="auto" height="auto" src="https://www.youtube.com/embed/PYwzW6CCxJU"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>

        </div>
      </div>
      `
      );
      console.log("append works");

      // Handles recipes list
      for (let j = 0; j < valuesIng.length; j++) {
        const ing = "<li>" + valuesIng[j] + "</li>";
        $("#recList").append(
          ing
        );
      }
      console.log("test recList population successful");

      // Handles Directions population
      // for (let k = 0; k < values.length; k++) {
      //   const dir = "<li>" + values[k] + "</li>";
      //   $("#recDirections").append(
      //     dir
      //   );
      // };
      // console.log("test recDirections population successful");
    });
  });
});
