const mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: " coursename is required",
  },
  courseId: {
    type: String,
  },
  courseFee: {
    type: String,
  },
  courseDuration: {
    type: String,
  },
});
mongoose.model("Course", courseSchema);
