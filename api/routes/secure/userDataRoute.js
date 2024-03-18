const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
const { getTodos } = require("../../controllers/signupController");

const userDataRoute = (app) => {
  //route to get the todos
  app.get("/login/data", jwtMiddleware, getTodos);
};

module.exports = userDataRoute;
