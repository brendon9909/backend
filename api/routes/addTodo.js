const { addController } = require("../controllers/todoController");
const addTaskMiddleware = require("../middleware/addTaskMiddleware");

const addTodo = (app) => {
  //route to add a new todo
  app.put("/todo/add", addTaskMiddleware, addController);
};

module.exports = addTodo;
