//serve html/handlebars

var express = require("express");

var router = express.Router();

var db = require("../models");

//on landing page, render the index.hbs file with 3 random recipes from the db
router.get("/", (req, res) => {
  db.Recipe.findAll({
    order: db.sequelize.random(),
    limit: 3
  }).then(function(recipes) {
    res.render("index", recipes);
  });
});

module.exports = router;
