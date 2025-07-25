const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");
const { app } = require("../app");

async function showUser(req, res) {
  try {
    const id = app.locals.userId;
    if (!id) {
      const users = await User.find({});
      // console.log(Object(users));
      res.send(users);
    }
    console.log(id);
    const currentUser = await User.findById(id);
    app.locals.userId = undefined;
    res.json({
      username: currentUser.username,
      _id: currentUser._id,
    });
  } catch (err) {
    console.error("Server Error: ", err.message);
    throw new Error(`Server Error 505`, err.message);
  }
}

async function showExerciseLogs(req, res) {
  const id = req.params._id;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const exeId = app.locals.exerciseId;
  const exercise = await Exercise.findById(exeId);

  if (!exeId) return res.status(404).json({ error: "Exercise not found" });

  res.send({
    _id: user._id,
    username: user.username,
    date: exercise.date.toDateString(),
    duration: exercise.duration,
    description: exercise.description,
  });
}

module.exports = {
  showUser,
  showExerciseLogs,
};
