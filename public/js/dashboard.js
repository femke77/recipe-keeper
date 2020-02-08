$(document).ready(function() {
  $("#dash").show();
  $("#logout").show();

  // On Search Click
  $.get("/user").then(function(user) {
    var userid = user.id;
    // // Send the GET request.
    $.ajax("/api/saved/" + userid, {
      type: "GET"
    }).then(function(response) {
      $("#recipesBody").empty();

      for (let i = 0; i < response.length; i++) {
        const element = response[i];

        // Append them to food list
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
                        <a href="#" class="card-footer-item">Remove from Faves</a>
                        
                    </footer>
                </div>`
        );
      } //end for loop
    });
  });
  // End Search Click

  // Start Card Click to display recipe
  $(document.body).on("click", ".recipe-card", function() {
    //id = title in this case. This has to be corrected b/c title is not unique in db
    var keyword = this.getAttribute("id");
    $.get("/user")
      .then(function(user) {
        // eslint-disable-next-line no-unused-vars
        var userId = user.id;
        return userId;
      })
      .then(function(userId) {
        // Send the PUT request.
        $.ajax("/api/search/" + keyword, {
          type: "GET"
        })
          .then(function(response) {
            $("#recipesBody").empty();
            const element = response[0];
            // Handling ingredients list
            const valuesIng = Object.values(element.ingredients);
            //attach recipe data to modal for use with notes
            $("#saveNote").data("recipeData", element);
            //attach recipe data to recipeBody div
            $("#recipesBody").data("recipeData", element);

            // Append them to food list
            $("#recipesBody").append(
              `<div class="column is-one-quarter">
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
                <a class="card-footer-item" id="openModal">Add or Edit Note</a>
                <a class="card-footer-item">Remove from Faves</a>
            </footer>
            </div>
        </div>

        <!-- Card two -->
        <div class="column is-one-quarter">
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

   <!-- Card three -->
    <div class="column is-one-quarter">
      <div class="card large">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4 no-padding">Directions</p>
              <hr>
                        </div>
            </div>
            <div class="content">
              <ol id="recDirections">
              </ol>
            </div>
          </div>

        </div>
      </div> 
      `
            );

            // Handles recipes list
            for (let j = 0; j < valuesIng.length; j++) {
              const ing = "<li>" + valuesIng[j] + "</li>";
              $("#recList").append(ing);
            }
            // Instructions listing
            var instructions = element.instructions;
            var a1 = new Array();
            a1 = instructions.split(".");
            for (let k = 0; k < a1.length - 1; k++) {
              const instrucDisplay = "<li>" + a1[k] + "</li>";
              $("#recDirections").append(instrucDisplay);
            }
            return element;
          })
          .then(function(element) {
            var recipeId = element.id;
            console.log(recipeId + " " + userId);
            $.get("/api/note/" + recipeId + "/" + userId).then(function(note) {
              console.log(note);
              if (note) {
                $("#recipesBody").append(
                  `<div class="column is-one-quarter">
                      <div class="card large note">
                          <div class="card-content">
                              <div class="media">
                                  <div class="media-content">
                                      <p class="title is-4 no-padding">Notes</p>
                                    <hr>
                                    ${note.note}
                                 </div>
                              </div>
                            <div class="content">
                     </div>
                  </div>
  
                </div>
            </div>
            `
                );
              } else {
                $("#recipesBody").append(
                  `<div class="column is-one-quarter">
                        <div class="card large note">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 no-padding">Notes</p>
                                      <hr>
                                    
                                   </div>
                                </div>
                              <div class="content">
                       </div>
                    </div>
    
                  </div>
              </div>
              `
                );
              }
            });
          });
      });
  });

  $("#saveNote").on("click", function() {
    var note = $("#userNotes")
      .val()
      .trim();
    //get the recipe id from the recipe's modal
    var currentRecipe = $(this).data("recipeData");
    //get the user id from session
    $.get("/user").then(function(user) {
      var noteObj = {
        note: note,
        RecipeId: currentRecipe.id,
        UserId: user.id
      };
      //upsert the note data by unique key recipeId and userId
      $.ajax({
        type: "put",
        url: "/api/note",
        data: noteObj
      }).then(function() {
        $("#userNotes").val(" ");
        $.get("/api/note/" + noteObj.RecipeId + "/" + noteObj.UserId).then(
          function(note) {
            $("#recipesBody").data("noteData", note);
          }
        );
      });
    });
  });

  $("#deleteNote").on("click", function() {
    //get id from element data
    var noteId = 2;
    $.ajax({
      type: "delete",
      url: "/api/note/" + noteId
    }).then(function() {
      console.log("note deleted");
    });
  });

  $(document.body).on("ready", "#welcome", function() {
    $(".modal").addClass("is-active");
    console.log("modal pops");
  });

  $(document.body).on("click", "#openModal", function() {
    $(".modal").addClass("is-active");
  });

  $(document.body).on("click", "#closeModal", function() {
    $(".modal").removeClass("is-active");
  });

  $(document.body).on("click", "#saveNote", function() {
    $(".modal").removeClass("is-active");
  });

  $(document.body).on("click", ".delete", function() {
    $(".modal").removeClass("is-active");
  });
}); //end doc ready fn
