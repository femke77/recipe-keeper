//serve html/handlebars

var express = require("express");

var router = express.Router();

var db = require("../models");

//on landing page, render the index.hbs file with x number of  random recipes from the db
router.get("/", (req, res) => {
  db.Recipe.findAll({
    order: db.sequelize.random(),
    limit: 1
  }).then(function(recipes) {
    var hbsObject = {
      recipes: recipes
    };
    res.render("index", hbsObject);
  });
});

module.exports = router;
