const User = require("../models/userModel");
const { app } = require("../app");

async function showUser(req, res) {
  const id = app.locals.userId;
  const currentUser = await User.findById(id);
  res.json({ _id: currentUser._id, username: currentUser.username });
}

async function showExerciseLogs(req, res) {
  res.json({ say: "Hello World!" });
}

module.exports = {
  showUser,
  showExerciseLogs,
};
