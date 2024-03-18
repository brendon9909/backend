const { editController } = require("../controllers/todoController");
const editTaskMiddleware = require("../middleware/editTaskMiddleware");

const editTodo = (app) => {
  //route to edit a todo
  app.put("/todo/edit", editTaskMiddleware, editController);
};

module.exports = editTodo;
