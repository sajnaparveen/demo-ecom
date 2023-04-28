const express = require("express");
const { Admin } = require("mongodb");
const app = express();
const mongoose = require("mongoose");
const { userInfo } = require("os");
const port = 8000;
const env = require("dotenv").config();
const bodyparser = require("body-parser");

//routes
const userroute = require("./routes/user.route");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("db error", err.message);
  });

//api

app.use("/user", userroute);

app.listen(port, () => {
  console.log(`port ${port}`);
});
