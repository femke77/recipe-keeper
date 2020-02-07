//serve html/handlebars

var express = require("express");

var router = express.Router();

var db = require("../models");

//on landing page, render the index.hbs file with x number of  random recipes from the db
router.get("/", (req, res) => {
  db.Recipe.findAll({
    order: db.sequelize.random(),
    limit: 3
  }).then(function(recipes) {
    var hbsObject = {
      recipes: recipes
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// TEST (un note later)
router.get("/dashboard", (req, res) => {
  //show all saved recipes with their notes (join)
  res.render("dashboard");
});
// END TEST

router.get("/create", (req, res) => {
  //show form to make a new recipe
  res.render("createRecipe");
});

router.get("/recipe", (req, res) => {
  //show all saved recipes with their notes (join)
  res.render("recipe");
});

router.get("*", (req, res) => {
  //show 404 page for all pages w/o routes
  res.render("404");
});

module.exports = router;
