const { route } = require("../app");
const { createUser, addExercise } = require("../controllers/postController");

module.exports = route.post("/users", createUser);
module.exports = route.post("/users/:id/exercises", addExercise);
