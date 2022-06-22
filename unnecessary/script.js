// require("./models/mongodb");
const express = require("express");
const app = express();
const path = require("path");
const exphb = require("express-handlebars");
const bodyParser = require("body-parser");

const courseController = require("./controllers/courseController");
app.use(bodyParser.urlencoded({ extended: true }));

//Create a welcome message and direct them to the main page
app.get("/", (req, res) => {
  res.send(
    '<h2 style="font-family: Malgun Gothic; color: midnightblue ">Welcome to Edureka Node.js MongoDB Tutorial!!</h2>Click Here to go to <b> <a href="/course">Course Page</a> </b>'
  );
});

app.use(bodyParser.json());

//Configuring Express middleware for the handlebars

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  ".hbs",
  exphb.engine({ extname: ".hbs", defaultLayout: "mainLayout" })
);
app.set("view engine", ".hbs");

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Set the Controller path which will be responding the user actions
app.use("/course", courseController);
