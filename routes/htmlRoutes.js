var express = require("express");
var router = express.Router();
var db = require("../models");
//var exports = (module.exports = {});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// exports.signup = function(req, res) {
//   res.render("signup");
// };

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/test", isLoggedIn, function(req, res) {
  console.log(req.user);
  res.send("Hello");
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

router.get("/dashboard", (req, res) => {
  //show all saved recipes with their notes (join)
  res.render("dashboard");
});

router.get("/create", (req, res) => {
  //show form to make a new recipe
  res.render("createRecipe");
});

router.get("*", (req, res) => {
  //show 404 page for all pages w/o routes
  res.render("404");
});

module.exports = router;
