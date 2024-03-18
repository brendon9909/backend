const editTaskMiddleware = (req, res, next) => {
  //middleware to limit characters in editing a task
  try {
    //check task length
    if (req.body.newTodo.length > 140) {
      return res
        .status(422)
        .send({ message: "task cannot be more than 140 characters" });
    } else {
      //call next middleware
      next();
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = editTaskMiddleware;
