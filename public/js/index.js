//jquery pull newRecipe data from user input
let newRecipe = {
  title: title,
  servings: servings,
  image: image,
  category: category,
  dishType: dishType,
  source: source,
  instructions: instructions,
  ingredients: ingredients
};

//send to database with post
$.post("/db/newrecipe", newRecipe, function() {
  console.log("posted");
});
