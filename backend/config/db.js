const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const dbStatus = await mongoose.connect(process.env.MONGO_URI);
    console.log("dbStatus", dbStatus);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
