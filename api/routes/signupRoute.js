const { signupController } = require("../controllers/signupController");
const validateMiddleware = require('../middleware/validateMiddleware')

const signupRoute = (app) => {
  //route to signup
  app.post("/signup", validateMiddleware, signupController);
};

module.exports = signupRoute;
