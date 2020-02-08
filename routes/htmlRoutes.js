var express = require("express");
var router = express.Router();
var db = require("../models");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", isLoggedIn, function(req, res) {
  var user = {
    name: req.user
  };
  res.render("dashboard", user);
});

router.get("/user", isLoggedIn, function(req, res) {
  console.log(req.user);
  res.json(req.user);
});

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

router.get("/create", (req, res) => {
  //show form to make a new recipe
  res.render("createRecipe");
});

router.get("/recipe", (req, res) => {
  //show all saved recipes with their notes
  res.render("recipe");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("*", (req, res) => {
  //show 404 page for all pages w/o routes
  res.render("404");
});

module.exports = router;
