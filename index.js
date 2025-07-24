const { express, app } = require("./app");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./db");
const postRoute = require("./routes/postRoute");
const getRoute = require("./routes/getRoute");

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.use("/api", postRoute);
app.use("/api", getRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, () => {
  console.log(`System is running on port :${PORT}`);
});
