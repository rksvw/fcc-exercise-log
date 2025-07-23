const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

class Database {
  constructor() {
    this._connent();
  }

  _connent() {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error.");
      });
  }
}

module.exports = new Database();
