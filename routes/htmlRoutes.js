//serve html/handlebars

var express = require("express");
var app = require("../server");
var router = express.Router();
var sessionChecker = require("../server");
var exphbs = require("../server");

app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

app.route("/signup").get((req, res) => {
  res.render("signup", exphbs);
});
module.exports = router;
