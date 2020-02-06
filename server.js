/* eslint-disable no-unused-vars */
// git arequire("dotenv").config();
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
// var env = require("dotenv").load();
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");
var db = require("./models");
var path = require("path");

var PORT = process.env.PORT || 3000;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static("public"));
var handlebars = require("express-handlebars").create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  // partialsDir: path.join(__dirname, "views/partials"),
  //defaultLayout: 'layout',
  extname: "hbs"
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//   app.get('/', function(req, res){
//     res.render('signup');
//   });
app.use(express.static(path.join(__dirname, "public")));

//Models
var models = require("./models");

//Routes

var authRoute = require("./routes/user")(app);

//load passport strategies

require("./config/passport.js")(passport, models.user);

//Sync Database
models.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function(err) {
    // var env = require('dotenv').load();
    if (!err) {
      console.log("Site is live");
    } else {
      console.log(err);
    }
  });
  console.log("Nice! Database looks fine");
});

// Routes
app.use(apiRoutes);
app.use(htmlRoutes);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
// module.exports = sessionChecker;
