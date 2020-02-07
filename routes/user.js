// eslint-disable-next-line no-unused-vars
var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get("/", function(req, res) {
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
    return res.redirect("/test");
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
    //console.log( req.body );
    //res.redirect( '/' );
  })(req, res);
});
router.get("/logout", function(res, req) {
  req.session.destroy(function() {
    res.redirect("/login");
  });
});

module.exports = router;
