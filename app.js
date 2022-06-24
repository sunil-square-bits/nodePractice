const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const webtoken = require("jsonwebtoken");
const res = require("express/lib/response");
require("./models/mongodb");
require("dotenv").config();
var app = express();
app.use(logger("dev"));
app.use(express.json());
const userModel = mongoose.model("User");
let secretKey = process.env.JWT_SECRET_KEY;
let expireTime = process.env.JWT_EXPIRE;
async function setPassword(password) {
  let salt = await bcrypt.genSalt(10);
  let encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
}

async function insertUserDetailsInDatabase(reqBody, res) {
  const { username, password, type, email } = reqBody.body;
  let obj = {
    name: username,
    email: email,
  };
  let user = new userModel();
  user.username = username;
  user.email = email;
  user.password = await setPassword(password);
  user.type = type;
  //   toAuthJson
  user.accessToken = generateToken(obj);
  user.save((err, doc) => {
    if (!err) {
      let authJson = authJsonFunc(doc, obj);
      res.send(authJson);
    } else {
      res.send(err);
    }
  });
}

app.get("/", (req, res) => {
  userModel.find((err, doc) => {
    res.send(doc);
  });

  //   res.send("hello")
});

function verifyAuthToken(token, res) {
  webtoken.verify(token, secretKey, (err, decode) => {
    if (!err) {
      res.json({ message: " verified token" });
    } else {
      res.json({ message: "not verified token" });
    }
  });
  // return verification;
}
function generateToken(obj) {
  return webtoken.sign(obj, secretKey, {
    expiresIn: expireTime,
  });
}
function authJsonFunc(data, obj) {
  let authTokenn = generateToken(obj);
  return {
    ...obj,
    authToken: authTokenn,
    type: data.type,
    password: data.password,
    id: data._id,
  };
}
app.post("/api/register", async (req, res) => {
  if (!req.body._id) {
    await insertUserDetailsInDatabase(req, res);
  } else {
    res.send("data already present");
  }
});

app.post("/api/auth", async (req, res) => {
  if (req.body.accessToken) {
    verifyAuthToken(req.body.accessToken, res);
    // if (isVerified) {
    //   res.json({ message: "verified token" });
    // } else {
    //   res.json({ message: "not verified token" });
    // }
    // console.log("verify", isVerified);
  } else {
    res.json({ message: "please provide token" });
  }
});

app.post("/api/login", async (req, res) => {
  if (req.body.email) {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      let validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        res.status(200).json({ message: "valid password" });
      } else {
        res.status(400).json({ message: "invalid password" });
      }
    } else {
      res.status(401).json({ message: "user does not exit" });
    }
  }
});

const port = process.env.PORT || 4500;
// console.log("env", process.env.BASEURL_DATABASE);
app.listen(port, () => console.log("listening at 4500 port"));
