const express = require("express");
const User = require("../../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body.email;
  

  bcrypt.hash(password, 10).then(hash => {
    const user = new User({
      email,
      password: hash
    });

    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created",
          result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let fetchedUser;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Failed Login"
        });
      }

      fetchedUser = user;
      console.log(password,user);
      
      return bcrypt.compare(password, user.password);
    }).then(result => {
      console.log(result);

      if (!result) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      //login
      const token = jwt.sign(
        {
          email:fetchedUser.email,
          userId: fetchedUser._id
        },
        "secret_longer_password",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token
      });
    })
    .catch(err => {
      console.log(err);
      
      return res.status(401).json({
        message: "Auth Failed"
      });
    });
});

module.exports = router;
