const mongoose = require("mongoose");

const ApplicationSchrema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    JobId: {
      type: String,
    },
  },
  { strict: false }
);

module.exports = mongoose.model(
  "Applications",
  ApplicationSchrema,
  "applications"
);
