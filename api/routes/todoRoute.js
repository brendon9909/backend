const { completeController } = require("../controllers/todoController");

const todoRoute = (app) => {
  //route to complete a todo
  app.put("/todo/complete", completeController);
};

module.exports = todoRoute;
