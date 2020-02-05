//api routing
var express = require("express");

var router = express.Router();

var db = require("../models");

const { Op } = require("sequelize");

//Post a new recipe to the database
router.post("/api/newrecipe", (req, res) => {
  if (!req.body) {
    res.status("400").send("req body is required.");
    return;
  }
  db.Recipe.create(req.body).then(function() {
    res.status(200).end();
  });
});

//return recipe with the requested id
router.get("/api/recipe/:id", (req, res) => {
  db.Recipe.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(recipe) {
    res.json(recipe);
  });
});

router.get("/api/search/:keyword", (req, res) => {
  var keyword = "%" + req.params.keyword + "%";
  console.log(req.params.keyword);
  db.Recipe.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: keyword
          }
        },
        {
          category: {
            [Op.like]: keyword
          }
        }
      ]
    }
  }).then(function(recipes) {
    res.json(recipes);
  });
});

module.exports = router;
