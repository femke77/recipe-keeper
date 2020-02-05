var authController = require("../controller/authController.js");

module.exports = function(app) {
  app.get("/signup", authController.signup);
};
