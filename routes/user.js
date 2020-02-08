var express = require("express");
var router = express.Router();
var passport = require("passport");

router.post("/signup", function(req, res, next) {
  passport.authenticate("signup", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("User not registered");
      return res.redirect("/signup");
    }
    console.log("User registered!");
    return res.redirect("/dashboard");
    //res.redirect( '/' );
  })(req, res, next);
});

router.post("/api/login", function(req, res, next) {
  passport.authenticate("login", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("User not authenticated");
      return res.redirect("/");
    }
    req.logIn(user, function(loginerr) {
      if (loginerr) {
        console.log("Error while login: " + loginerr);
        return next(loginerr);
      }
      req.session.messages = "Login successfull";
      req.session.authenticated = true;
      req.authenticated = true;
      return res.redirect("/dashboard");
    });
  })(req, res, next);
});

//logout router destroy session
router.get("/logout", function(req, res) {
  req.session.destroy(function() {
    res.redirect("/");
    // console.log("logged out : " + user);
  });
});

module.exports = router;
