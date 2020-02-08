$(document).ready(function() {
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
        $(".recipe-card").data("recipe", element);
      } //end for loop
    });
  });

  // End Search Click

  // Start Card Click to display recipe
  $(document.body).on("click", ".recipe-card", function() {
    var keyword = this.getAttribute("id");

    // Send the PUT request.
    $.ajax("/api/search/" + keyword, {
      type: "GET"
    }).then(function(response) {
      $("#recipesBody").empty();
      const element = response[0];

      // Handling ingredients list
      const valuesIng = Object.values(element.ingredients);

      //attach recipe data to modal
      $("#saveNote").data("recipeData", element);
      
      var test = $("#saveNote").data("recipeData");
      console.log("test recipe id " + test.id);
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
                    <a class="card-footer-item" id="openModal">Add a Note</a>
                    <a class="card-footer-item">Remove from Faves</a>
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
      console.log("test recList population successful");
      // START---  instructions listing  WORKING --------------------------------------3
      var instructions = element.instructions;
      var a1 = new Array();
      a1 = instructions.split(".");
      console.log("length is: " + a1.length);
      for (let k = 0; k < a1.length - 1; k++) {
        const instrucDisplay = "<li>" + a1[k] + "</li>";
        $("#recDirections").append(instrucDisplay);
      }
      // END --- instructions WORKING ----------------------------------------3
    });
  });

  $("#saveNote").on("click", function() {
    console.log("clicked");
    var note = $("#userNotes")
      .val()
      .trim();
    
    var currentRecipe = $(this).data("recipeData");
    console.log("recipe id " + currentRecipe.id);

    //get the user id from session
    $.get("/user").then(function(user) {
      console.log("this is my " + user.id);
      var noteObj = {
        note: note,
        RecipeId: currentRecipe.id,
        UserId: user.id
      };
      console.log(noteObj.RecipeId);
      $.ajax({
        type: "put",
        url: "/api/note",
        data: noteObj
      }).then(function() {
        $("#userNotes").val(" ");
        //get the note id of the note to attach to element for possible delete
        $.get("/api/note/" + note.RecipeId + "/" + note.UserId).then(
          function() {
            //change this var noteDiv to whatever it really is
            $("noteDiv").data("nodeId", result.id);
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

  $(document.body).on("click", "#openModal", function() {
    $(".modal").addClass("is-active");
    console.log("modal pops");
  });

  $(document.body).on("click", "#closeModal", function() {
    $(".modal").removeClass("is-active");
    console.log("modal pops");
  });

  $(document.body).on("click", "#saveNote", function() {
    $(".modal").removeClass("is-active");
    console.log("modal pops");
  });

  $(document.body).on("click", ".delete", function() {
    $(".modal").removeClass("is-active");
    console.log("modal pops");
  });
}); //end doc ready fn
