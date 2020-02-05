/* eslint-disable no-unused-vars */
require("dotenv").config();
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

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());
// MIDDLEWARE FOR PASSPORT
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookies: {
      expires: 600000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("views", "../views");
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    defaultLayput: "layout",
    layoutDir: __dirname + "/views/layouts"
  })
);
app.set("view engine", ".hbs");

// Routes
app.use(apiRoutes);
app.use(htmlRoutes);
app.use(auth);

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
