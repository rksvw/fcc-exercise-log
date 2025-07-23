async function createUser(req, res) {
  res.json({ say: "Hello World!" });
}

async function addExercise(req, res) {
  res.json({ say: "Hello World!" });
}

module.exports = {
  addExercise,
  createUser,
};
