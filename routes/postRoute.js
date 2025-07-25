const { route } = require("../app");
const { createUser, addExercise } = require("../controllers/postController");
const upload = require("../middleware/upload");

module.exports = route.post("/users", upload.none(), createUser);
module.exports = route.post(
  "/users/:_id/exercises",
  upload.none(),
  addExercise
);
