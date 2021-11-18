const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    username: {
      type: String
    }
  }
);

module.exports = admin = mongoose.model("admin", adminSchema);