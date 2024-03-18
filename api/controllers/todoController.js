const user = require("../models/user");

const completeController = async (req, res) => {
  //controller to mark a todo as complete
  try {
    //find the user
    const myUser = await user.findOne({ username: req.body.username });

    //get index of specific todo
    const todoIndex = myUser.todos.findIndex(
      (todos) => todos.text === req.body.todo
    );

    if (todoIndex !== -1) {
      //update the todos complete
      await user.updateOne(
        { _id: myUser._id, "todos.text": req.body.todo },
        { $set: { "todos.$.completed": true } }
      );

      res.send(myUser);
    } else {
      res.status(404).send({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const resetController = async (req, res) => {
  //controller to mark a todo as incomplete
  try {
    //find the user
    const myUser = await user.findOne({ username: req.body.username });

    //get todos index
    const todoIndex = myUser.todos.findIndex(
      (todos) => todos.text === req.body.todo
    );

    if (todoIndex !== -1) {
      //update the complete to false
      await user.updateOne(
        { _id: myUser._id, "todos.text": req.body.todo },
        { $set: { "todos.$.completed": false } }
      );

      res.send(myUser);
    } else {
      res.status(404).send("todo not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const addController = async (req, res) => {
  //controller to add a new todo
  try {
    //find the user
    const myUser = await user.findOne({ username: req.body.username });

    //push the new todo into the todos array
    myUser.todos.push({ text: req.body.todo, completed: false });

    //save the user
    myUser.save();

    res.send("todo added");
  } catch (error) {
    console.error("something went wrong", error);
  }
};

const deleteController = async (req, res) => {
  //controller to delete a todo
  try {
    //find the user
    const myUser = await user.findOne({ username: req.body.username });

    if (myUser) {
      //get the todo's index
      const index = myUser.todos.findIndex(
        (todo) => todo.text === req.body.todo
      );

      if (index !== -1) {
        const foundTodo = myUser.todos[index].text;
        //remove the todo
        myUser.todos.splice(index, 1);
        //save the user
        await myUser.save();
        res.send(foundTodo);
      } else {
        res.status(404).send("todo not found");
      }
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.error("something went wrong", error);
  }
};

const editController = async (req, res) => {
  //controller to edit a todo
  try {
    //find the user
    const myUser = await user.findOne({ username: req.body.username });

    //edit a todo
    await user.updateOne(
      { _id: myUser._id, "todos.text": req.body.todo },
      { $set: { "todos.$.text": req.body.newTodo } }
    );

    res.send("todo updated");
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  completeController,
  resetController,
  addController,
  deleteController,
  editController,
};
