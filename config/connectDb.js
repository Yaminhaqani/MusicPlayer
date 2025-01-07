const mongoose = require("mongoose");
URI = process.env.URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected on Atlas");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDb };
