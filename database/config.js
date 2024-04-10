const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
  } catch (err) {
    console.error(err);
    throw err("Error connecting to MongoDB");
  }
};

module.exports = { dbConnection };
