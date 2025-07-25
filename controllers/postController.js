const { app } = require("../app");
const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");

async function createUser(req, res) {
  try {
    const { username } = req.body;

    const reqUser = await User.findOne({ username });

    console.log(reqUser);
    if (isNaN(reqUser)) {
      app.locals.userId = reqUser._id;

      res.json({
        username: reqUser.username,
        _id: reqUser._id,
      });
    } else {
      const newUser = new User({
        username,
      });

      const userDoc = await newUser.save();

      app.locals.userId = userDoc._id;

      res.json({
        username: userDoc.username,
        _id: userDoc._id,
      });
    }
  } catch (err) {
    console.error("Server Error");
    throw new Error("Server Side Error");
  }
}

async function addExercise(req, res) {
  const id = req.params.id;
  const description = req.body.description;
  const duration = req.body.duration;
  const rawDate = req.body.date;

  const [year, month, day] = rawDate.split("-");

  const parsedDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  const newExercise = new Exercise({
    userId: id,
    description: description,
    duration: duration,
    date: parsedDate,
  });

  const exeDoc = await newExercise.save();

  app.locals.exerciseId = exeDoc._id;
  res.json({ msg: "ok" });
}

module.exports = {
  addExercise,
  createUser,
};
