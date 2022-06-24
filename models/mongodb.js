const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  `${process.env.BASEURL_DATABASE}/uerLogin`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("Successfully Established Connection with MongoDB");
    } else {
      console.log(
        "Failed to Establish Connection with MongoDB with Error: " + err
      );
    }
  }
);

require("./course.model");
require("./user.model");
