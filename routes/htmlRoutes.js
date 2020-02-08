//serve html/handlebars

var express = require("express");
//var app = require("../server");
var router = express.Router();
var db = require("../models");
var passport = require("passport");

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
router.get("/dashboard", isLoggedIn, function(req, res) {
  console.log(req.user);
  res.send("Hello" + req.user.firstName);
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

// TEST (un note later)
router.get("/dashboard", (req, res) => {
  //show all saved recipes with their notes (join)
  res.render("dashboard");
});
// END TEST

router.get("/create", (req, res) => {
  //show form to make a new recipe
  res.render("createRecipe");
});

router.get("/recipe", (req, res) => {
  //show all saved recipes with their notes (join)
  res.render("recipe");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {
  passport.authenticate("signup", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // console.log( 'User not registered' );
      return res.redirect("/signup");
    }
    // console.log( 'User registered!' );
    return res.redirect("/dashboard");
    //res.redirect( '/' );
  })(req, res, next);
});
router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/", function(req, res, next) {
  passport.authenticate("login", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("User not authenticated");
      return res.redirect("/user/login");
    }
    req.logIn(user, function(loginerr) {
      if (loginerr) {
        console.log("Error while login: " + loginerr);
        return next(loginerr);
      }
      req.session.messages = "Login successfull";
      req.session.authenticated = true;
      req.authenticated = true;
      return res.redirect("/test");
    });
  })(req, res, next);
});
router.get("/logout", function(req, res) {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});

router.get("*", (req, res) => {
  //show 404 page for all pages w/o routes
  res.render("404");
});

module.exports = router;
