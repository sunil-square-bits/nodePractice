var fs = require("fs");

fs.readFile("test.txt", "utf8", function (err, data) {
  debugger;

  if (err) throw err;

  console.log(data);
});

// read file

// fs.readFile("../textEdit.txt", "utf8", function (err, data) {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
//   console.log(data);
// });

// append file

// fs.appendFile("../textEdit.txt", "luka modric", function (err, data) {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
//   console.log("completed");
// });
