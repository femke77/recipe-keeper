//serve html/handlebars

var express = require("express");
var app = require("../server");
var router = express.Router();
var sessionChecker = require("../server");
var exphbs = require("../server");

app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});
// for sign up page
app.route("/signup")
  .get((req, res) => {
    res.render("signup", exphbs);
  })
  .post((req, res) => {
    User.create({
      userName: req.body.userName,
      password: req.body.password
    })
      .then(userName => {
        req.session.user = user.dataValues;
        res.redirect("/dashboard");
      })
      .catch(error => {
        res.redirect("/signup");
      });
  });
module.exports = router;
