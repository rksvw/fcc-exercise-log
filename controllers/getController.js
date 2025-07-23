async function showUser(req, res) {
  res.json({ say: "Hello World!" });
}

async function showExerciseLogs(req, res) {
  res.json({ say: "Hello World!" });
}

module.exports = {
  showUser,
  showExerciseLogs,
};
