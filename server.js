require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");
var bodyParser = require("body-parser");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somtingWrong",
    resave: false,
    saveUnintialized: false,
    cookies: {
      expires: 600000
    }
  })
);
app.engine(
  "exphbss",
  exphbs({
    extname: "exphbs",
    defaultLayput: "layout",
    layoutDir: __dirname + "/views/layouts"
  })
);
app.set("view engine", "exphbs");
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookies("user_sid");
  }
  next();
});
var exphbs = {
  userName: "",
  loggedin: false,
  title: " you are not logged in",
  body: "Hello!"
};

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
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
module.exports = sessionChecker;
