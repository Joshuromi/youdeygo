const express = require("express");
const User = require("../model/userModel");
const app = express.Router();

app.get("/", (req, res) => res.send("Welcome to youDeyGo. A car pooling app"));

app.post("/", async (req, res) => {
  const { fullName, email, password } = req.body; 
  const user = new User(req.body);
  const createUser = await user.save();
  if (createUser) {
    res.status(200).json({
      message: "Success",
      createUser,
    });
  } else {
    res.status(200).json({
      message: "Something went wrong!",
    });
  }
});

module.exports = app;
