//Temp for posting new recipes. to be combined with api routes later
var express = require("express");

var router = express.Router();

var { Recipe } = require("../models");

router.post("/db/newrecipe", (req, res) => {
  if (!req.body) {
    res.status("400").send("req body is required.");
    return;
  }
  Recipe.create(req.body).then(function() {
    res.status(200).end();
  });
});

module.exports = router;
