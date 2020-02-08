$(document).ready(function() {
  //Add dynamic ingredient fields to form for creating a new recipe
  $("#addField").on("click", function(event) {
    event.preventDefault();
    var html =
      "<div class='field' <div class='control'> <input class='input ingredient' id='ingredient' type='text'></div></div>";
    $("#ingredientField").append(html);
  });

  //validate the form and display messages for incorrect fields if required

  var form = $(".recipe");
  form.validate({
    rules: {
      title: "required",
      servings: "required",
      category: "required",
      dishType: "required",
      ingredient: "required",
      instructions: "required"
    },
    messages: {
      title: "Please specify the title.",
      servings: "Specify how many servings this recipe makes.",
      category: "Please specify the cuisine type.",
      dishType: "Please specify the type of dish.",
      ingredient: "Please specify ingredient.",
      instructions: "Please enter the instructions for making the recipe."
    }
  });

  //Submit a new recipe
  $("#submitRecipe").on("click", function(event) {
    event.preventDefault();

    if (form.valid()) {
      console.log("valid form");

      //get the user id from session

      var ingredientJSON = {};
      var count = 0;

      //find all elements of class ingredient and make a json of the ingredient_count and value
      $(".ingredient").each(function() {
        ingredientJSON["ingredient_" + count++] = $(this).val();
      });

      console.log(ingredientJSON);
      //make a new recipe object with user id
      let newRecipe = {
        title: $("#title")
          .val()
          .trim(),
        servings: $("#servings").val(),
        image: $("#image")
          .val()
          .trim(),
        category: $("#category").val(),
        dishType: $("#dishType").val(),
        source: $("#source")
          .val()
          .trim(),
        instructions: $("#instructions")
          .val()
          .trim(),
        ingredients: ingredientJSON,
        //userid has to come from the passport session:
        UserId: 1
      };

      console.log(newRecipe);
      //send to database with post
      $.post("/api/newrecipe", newRecipe, function() {
        console.log("posted");
      });
    }
  });
});
