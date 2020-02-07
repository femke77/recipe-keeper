//serve html/handlebars

var express = require("express");
//var app = require("../server");
var router = express.Router();

var exports = (module.exports = {});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
exports.signup = function(req, res) {
  res.render("signup");
};
router.get("/test", isLoggedIn, function(req, res) {
  console.log(req.user);
  res.send("Hello");
});
// var sessionChecker = require("../server");
// var exphbs = require("../server");

// router.get("/", (req, res) => {
//   res.render("index");
// });
// // for sign up page
// router
//   .route("../signup")
//   .get((req, res) => {
//     res.render("signup", exphbs);
//   })
//   .post((req, res) => {
//     User.create({
//       username: req.body.username,
//       password: req.body.password
//     })
//       .then(username => {
//         req.session.user = user.dataValues;
//         res.render("/dashboard", { "user:": username });
//       })
//       .catch(error => {
//         res.render("/signup");
//       });
//   });
//   // route for user login
// router
//   .route("/login")
//   .get((req, res) => {
//     res.render("login", exphbs);
//   })
//   .post((req, res) => {
//     var username = req.body.username;
//     var password = req.body.password;
//   });
module.exports = router;
