const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  //middleware to verify the token
  const jwtToken = req.headers["authorization"];
  //get token
  const tokenExtract = jwtToken.split(" ")[1];

  try {
    //verify the token with the key
    const payload = jwt.verify(tokenExtract, "SecretKey");

    //store the payload
    req.payload = payload;

    //call next middleware
    next();
  } catch (error) {
    res.status(403).send({ message: "Invalid token" });
  }
};

module.exports = {
  jwtMiddleware,
};
