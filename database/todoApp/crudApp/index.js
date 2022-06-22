require("../../../models/mongodb");
const express = require("express");
const Joi = require("joi");
const app = express();
const mongoose = require("mongoose");
const Course = mongoose.model("Course");
// const courseController = require("../../../unnecessary/controllers/courseController");
app.use(express.json());

// const songData = [
//   {
//     song: "a",
//     singer: "ab",
//     id: 1,
//   },
//   {
//     song: "b",
//     singer: "bc",
//     id: 2,
//   },
// ];

// /Creating function to insert data into MongoDB
function insertIntoMongoDB(req, res) {
  var course = new Course();
  course.courseName = req.body.courseName;
  course.courseId = req.body.courseId;
  course.courseDuration = req.body.courseDuration;
  course.courseFee = req.body.courseFee;
  course.save((err, doc) => {
    if (!err) {
      console.log("inserted successfully", doc);
      res.send(doc);
    } else {
      console.log("inserted", err);
      res.send(err);
    }
  });
}

//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
  console.log("req", req.body);
  Course.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        res.send(err);
      }
    }
  );
}

//get request or read
app.get("/api/course/:id", (req, res) => {
  Course.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
      // res.render("course/courseAddEdit", {
      //   viewTitle: "Update Course Details",
      //   course: doc,
      // });
    } else {
      res.send(err);
    }
  });
});
app.get("/api/course", (req, res) => {
  //pagination

  if (req?.body?.page) {
    Course.find((err, doc) => {
      if (!err) {
        let limit = req?.body?.limit ? req?.body?.limit : 10;
        let page = req?.body?.page;
        let pageData;
        if (doc.length != 0) {
          pageData = handlePagination(page, limit, doc);
          if (pageData.length) {
            res.send(pageData);
          } else {
            res.send("your requirement does not fullfill for database");
          }
        } else {
          res.send("databse is empty");
        }

        // res.render("course/courseAddEdit", {
        //   viewTitle: "Update Course Details",
        //   course: doc,
        // });
      } else {
        res.send(err);
      }
    });
  } else {
    Course.find((err, doc) => {
      if (!err) {
        if (doc.length == 0) {
          res.send("database is empty");
        } else {
          res.send(doc);
        }
        // res.render("course/courseAddEdit", {
        //   viewTitle: "Update Course Details",
        //   course: doc,
        // });
      } else {
        res.send(err);
      }
    });
  }
});

// pagination

function handlePagination(page, limit, data) {
  let newPageData = [];
  let minPage = (page - 1) * limit;
  let maxPage = data.length > page * limit ? page * limit : data.length;
  data.forEach((element, index) => {
    if (index >= minPage && index < maxPage) {
      newPageData.push(element);
    } else if (index > maxPage) {
      return newPageData;
    }
  });
  return newPageData;
}

// app.get("/api/songs", (req, res) => {
//   res.send(songData);
// });
// app.get("/api/songs/:id", (req, res) => {
//   const songg = songData.find((song) => {
//     if (song.id === parseInt(req.params.id)) {
//       return song;
//     }
//   });
//   console.log(songg);
//   if (!songg) {
//     res.send("there is error in id");
//   }
//   res.send(songg);
// });

// create api
app.post("/api/course", (req, res) => {
  if (!req.body._id) {
    insertIntoMongoDB(req, res);
  }
  // else updateIntoMongoDB(req, res);

  // const error = validateSong(req?.body);
  // let isAlready = songData.find((sf) => {
  //   if (sf.song == req.body.song || sf.singer == req.body.singer) {
  //     return true;
  //   }
  // });
  // let newSong;
  // if (!isAlready) {
  //   newSong = {
  //     id: songData.length + 1,
  //     song: req.body.song,
  //     singer: req.body.singer,
  //   };
  //   songData.push(newSong);
  // }

  // console.log("hell", error);
  // if (!error) {
  //   console.log("hell", res.status(), error);
  //   res.status(400).send(error?.details[0]?.message);
  //   return;
  // }
});

//update request
app.put("/api/course/:id", (req, res) => {
  if (!req.body._id) {
    updateIntoMongoDB(req, res);
  }

  // let updateSong = songData.find((sg) => sg.id === parseInt(req?.params?.id));
  // let validateData = validateSong(req?.body);
  // let newUpdatedData = [
  //   ...songData,
  //   {
  //     id: updateSong.id,
  //     song: req.body.song,
  //     singer: req.body.singer,
  //   },
  // ];
  // // (updateSong.song = req.body.song), (updateSong.singer = req.body.singer);
  // if (!updateSong) {
  //   return res.status(404).send("error in update");
  // }

  // res.send(newUpdatedData);
});

//delete api

app.delete("/api/course/:id", (req, res) => {
  Course.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send(err);
    }
  });
  // let deletedSong;
  // let toDeleteSong = songData.find((x) => x.id === parseInt(req.params.id));
  // if (toDeleteSong) {
  //   deletedSong = songData.filter(
  //     (cancion) => cancion.id != parseInt(req.params.id)
  //   );
  // } else {
  //   res.send("no song exist with this id");
  // }

  // console.log("isdeleted", deletedSong);
  // res.send("new data", deletedSong);
});

function validateSong(songv) {
  const schema = Joi.object({
    song: Joi.string().min(3).required(),
    singer: Joi.string().min(4).required(),
  });
  return schema.validate(songv);
}
const port = 3000;
app.listen(port, () => console.log("listening at 3000 port"));
// app.use("/course", courseController);

// else {
//   if (err.name == "ValidationError") {
//     // handleValidationError(err, req.body);
//     res.render("course/courseAddEdit", {
//       //Retaining value to be displayed in the child view
//       viewTitle: "Update Course Details",
//       employee: req.body,
//     });
//   } else console.log("Error during updating the record: " + err);
// }
