const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
   //const decoredToken = 
    jwt.verify(token, "secret_longer_password");
   // req.userData = { email: decoredToken.email, userId: decoredToken.userId };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You are not authenticated!" });
  }
};