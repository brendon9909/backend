const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const cors = require('cors')
app.use(cors())

const user = require("./models/user");

app.use(express.json());

//all routes
const signupRoute = require('./routes/signupRoute')
const loginRoute = require('./routes/loginRoute')
const userDataRoute = require('./routes/secure/userDataRoute')
const todoRoute = require('./routes/todoRoute')
const resetTodoRoute = require('./routes/resetTodoRoute')
const addTodo = require('./routes/addTodo')
const deleteTodo = require('./routes/deleteTodo')
const editTodo = require('./routes/editTodo')

//connect to mongoDB
mongoose
  .connect(
    "mongodb+srv://brendonpillay01:uCk4unfIJy3GiB13@cluster0.tu0sdrq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("conneced to database"))
  .catch((e) => console.error(e));

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    const users = await user.find();

    if (users.length > 0) {
      res.json(users);
    }
  } catch (error) {
    console.error("something went wrong", error.message);
  }
});

signupRoute(app)
loginRoute(app)
userDataRoute(app)
todoRoute(app)
resetTodoRoute(app)
addTodo(app)
deleteTodo(app)
editTodo(app)

app.delete('/delete', async(req, res) => {
  const response = await user.deleteMany()

  res.send(response)
})
