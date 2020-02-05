//serve html/handlebars

var express = require("express");

var router = express.Router();

var { Recipe } = require("../models");

//will send 3 random recipes as a combined object to handlebars for display on landing page
router.get("/", (req, res) => {
  Recipe.findAll({
    order: sequelize.random(),
    limit: 3
  }).then(function(recipes) {
    res.render("index", recipes);
  });
});

module.exports = router;
