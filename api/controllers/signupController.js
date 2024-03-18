const user = require("../models/user");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  //controller to handle user signup
  try {
    //get the username, password and todos from the request body
    const { username, password, todos } = req.body;

    //create the new user using the mongoose schema
    const myUser = new user({ username: username, password: password, todos: todos });

    //save the new user
    await myUser.save();

    res.send("New User Added");
  } catch (error) {
    console.error("something went wrong", error.message);
  }
};

const loginController = async(req, res) => {
  //controller for user logging in
  try {
    //get username and password from request body
    const { username, password } = req.body;

    //check if user exists
    const myUser = await user.findOne({
        username: username,
        password: password
    })

    if (!myUser) {
      res.status(404).send({message: "Incorrect user credentials"});
    }

    //create payload
    payload = {
      name: username,
      admin: false,
    };

    //create a new token and use secret key
    const token = jwt.sign(JSON.stringify(payload), "SecretKey", {
      algorithm: "HS256",
    });

    res.send({ user: username, token: token });
  } catch (error) {
    console.error({ error: error.message });
  }
};

const getTodos = async(req, res) => {
  //controller to get user's todos

    //get name from payload from middleware
    const {name, admin} = req.payload

    //find the user
    const myUser = await user.findOne({
        username: name
    })

    if(myUser){
      //send users todos
        res.send(myUser.todos)
    }
}

module.exports = {
  signupController,
  loginController,
  getTodos,
};
