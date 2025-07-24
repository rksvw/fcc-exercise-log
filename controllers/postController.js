const { app } = require("../app");
const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");

async function createUser(req, res) {
  const uname = req.body.inputValues;

  const newUser = new User({
    username: uname,
  });

  const userDoc = await newUser.save();

  app.locals.userId = userDoc._id;

  res.send({
    _id: userDoc._id,
    username: userDoc.username,
  });
}

async function addExercise(req, res) {

  console.log(req.body);
  res.json({ say: "Hello World!" });
}

module.exports = {
  addExercise,
  createUser,
};
