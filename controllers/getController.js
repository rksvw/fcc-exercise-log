const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");
const { app } = require("../app");

async function showUser(req, res) {
  const id = app.locals.userId;
  const currentUser = await User.findById(id);
  res.json({ _id: currentUser._id, username: currentUser.username });
}

async function showExerciseLogs(req, res) {
  const id = req.params._id;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const exeId = app.locals.exerciseId;
  const exercise = await Exercise.findById(exeId);

  if (!exeId) return res.status(404).json({ error: "Exercise not found" });

  console.log(exercise);
  console.log(user);

  res.json({
    _id: user._id,
    username: user.username,
    date: new Date(exercise.date).toUTCString(),
    duration: exercise.duration,
    description: exercise.description,
  });
}

module.exports = {
  showUser,
  showExerciseLogs,
};
