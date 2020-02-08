//To use this code, add a btn with id btn and insert the api key

// The following code is for increasing the size of the recipe database by hitting spoonacular api
var apiKey = "";
var num = 10;

// Button to trigger num more recipes be posted to the mysql database
$("#btn").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/random?number=" +
      num +
      "&apiKey=" +
      apiKey,
    method: "GET"
  }).then(function(res) {
    console.log(res);

    for (let i = 0; i < res.recipes.length; i++) {
      var title = res.recipes[i].title;
      var servings = res.recipes[i].servings || 0;
      var image = res.recipes[i].image || "";
      var category =
        res.recipes[i].cuisines.length > 0 ? res.recipes[i].cuisines[0] : "";
      var dishType =
        res.recipes[i].dishTypes.length > 0 ? res.recipes[i].dishTypes[0] : "";
      var source = res.recipes[i].sourceName || "";
      var instructions = res.recipes[i].instructions;
      var ingredients = {};

      console.log(
        `${title} ${servings} ${image} ${category} ${dishType} ${source}`
      );

      for (let j = 0; j < res.recipes[i].extendedIngredients.length; j++) {
        ingredients["ingredient_" + [j]] =
          res.recipes[i].extendedIngredients[j].original;
      }

      //make a new recipe object
      let newRecipe = {
        title: title,
        servings: servings,
        image: image,
        category: category,
        dishType: dishType,
        source: source,
        instructions: instructions,
        ingredients: ingredients
        //user id will added when this is part of a user submission. null okay here for now.
      };

      //send to database with post
      $.post("/api/newrecipe", newRecipe, function() {
        console.log("posted");
      });
    }
  });
}); //end #btn click for downloading recipes into db
