//api routing
var express = require("express");

var router = express.Router();

var { Recipe } = require("../models");

let recipeCount = 129;

//Post a new recipe to the database
router.post("/api/newrecipe", (req, res) => {
  if (!req.body) {
    res.status("400").send("req body is required.");
    return;
  }
  Recipe.create(req.body).then(function() {
    res.status(200).end();
  });
});

//return a random recipe or the recipe with the requested id
router.get("/api/recipe/:id?", (req, res) => {
  if (req.params.id) {
    Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(recipe) {
      res.json(recipe);
    });
  } else {
    var id = Math.round(Math.random() * recipeCount);
    Recipe.findOne({
      where: {
        id: id
      }
    }).then(function(recipe) {
      res.json(recipe);
    });
  }
});

module.exports = router;
