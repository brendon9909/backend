const { resetController } = require("../controllers/todoController");

const resetTodoRoute = (app) => {
  //route to reset completion of a todo
  app.put("/todo/reset", resetController);
};

module.exports = resetTodoRoute;
