//serve html/handlebars

var express = require("express");
var app = require("../server");
var router = express.Router();

app.route("/signup").get((req, res) => {
    res.render("signup", )});
module.exports = router;
