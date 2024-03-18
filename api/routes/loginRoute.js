const { loginController } = require("../controllers/signupController");

const loginRoute = (app) => {
  //route to login
  app.post("/login", loginController);
};

module.exports = loginRoute;
