const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    courseid: {
      type: String
    },
    coursename: {
      type: String
    }
  }
);

module.exports = course = mongoose.model("course", courseSchema);