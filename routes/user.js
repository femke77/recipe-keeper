// eslint-disable-next-line no-unused-vars
var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get("/signup", function(req, res) {
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

router.post("/login", function(req, res) {
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
  })(req, res);
});
router.get("/logout", function(req, res) {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});

module.exports = router;
