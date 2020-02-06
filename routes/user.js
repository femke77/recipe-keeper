var express = require("express");
var passport = require("passport");
var bcrypt = require("bcrypt");
var db = require("../models");
console.log("routes connected");
module.exports = function(app) {
  app.get("/", function(req, res){
    console.log("signup");
    res.render("signup");
  });

  app.post("/signup", function(req, res){
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var userName = req.body.username;
    var password = req.body.password;
    var newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,     
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    };
    db.User.create(newUser, function(err, userInfo) {
      if(err) {throw err;}
      console.log(userInfo);
    });
    res.redirect("/signup");
  });
  app.get("/login", function(req, res){
    res.render("login");
  });

  app.post("/login", function(req, res) {
    username,
    password;

  });
  app.post("/signup", passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/signup"
  })
};
