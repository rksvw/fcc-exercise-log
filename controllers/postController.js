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
    console.error("Server Error", err.message);
    throw new Error("Server Side Error", err.message);
  }
}

async function addExercise(req, res) {
  try {
    // Parsed id from params & body
    const id = req.params._id;
    const { description, duration, date } = req.body;

    // split the date
    const [year, month, day] = date.split("-");

    // make the date to 25 July 1025 like
    const parsedDate = new Date(`${year}-${month}-${day}`);
    console.log(parsedDate);

    // Create new Entry of Exercise
    const newExercise = new Exercise({
      userId: id,
      description: description,
      duration: duration,
      date: parsedDate.toDateString(),
    });

    // Save the entry
    const exeDoc = await newExercise.save();

    // Count the entry
    const count = await Exercise.aggregate([
      {
        $group: {
          _id: `${id}`,
          count: { $sum: 1 }, // this means that the count will increment by 1
        },
      },
    ]);

    // Retrieve the user data
    const user = await User.findOne({ _id: id });

    // Create logs
    const log = [];
    const obj = {};
    obj["description"] = exeDoc.description;
    obj["duration"] = exeDoc.duration;
    obj["date"] = exeDoc.date.toDateString();
    log.push(obj);

    // Save the locals data
    app.locals.exerciseId = exeDoc._id;

    // Correct response
    res.json({
      username: user.username,
      count: count[0].count,
      _id: user._id,
      log: log,
    });
  } catch (err) {
    console.error("Server Error ", err.message);
    throw new Error("Server Error: ", err.message);
  }
}

module.exports = {
  addExercise,
  createUser,
};
