const { deleteController } = require("../controllers/todoController");

const deleteTodo = (app) => {
  //route to delete a todo
  app.delete("/todo/delete", deleteController);
};

module.exports = deleteTodo;
