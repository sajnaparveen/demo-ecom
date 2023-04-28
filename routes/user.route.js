const { Router } = require("express");
const userschema = require("../models/user.model");

const route = require("express").Router();

route.post("/register", async (req, res) => {
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;

  const user = userschema(req.body);

  const result = await user.save();

  if (result) {
    return res
      .status(200)
      .json({ status: true, message: "success", result: result });
  } else {
    return res.status(400).json({ status: false, message: "failed" });
  }
});

route.get("/getall", async (req, res) => {
  const allUser = await userschema.find().exec();
  if (allUser) {
    res.status(200).json({ status: true, message: "success", result: allUser });
  } else {
    res.status(400).json({ status: false, message: "no user found" });
  }
});
route.get("/ind-user", async (req, res) => {
  let email = req.body.email;
  const allUser = await userschema.findOne({ email: email }).exec();
  if (allUser) {
    res.status(200).json({ status: true, message: "success", result: allUser });
  } else {
    res.status(400).json({ status: false, message: "no user found" });
  }
});
route.put("/update-data", async (req, res) => {
  let user = req.body.userName;
  let email = req.body.email;
  const User = await userschema.findOne({ userName: user }).exec();
  if (User) {
    const updateEmail = await userschema
      .findOneAndUpdate({ email: email }, { new: true })
      .exec();
    res.status(200).json({
      status: true,
      message: "successfully updated",
      result: updateEmail,
    });
  } else {
    res.status(400).json({ status: false, message: "no user found" });
  }
});
route.delete("/delete", async (req, res) => {
  let user = req.body.userName;
  const User = await userschema.findOne({ userName: user }).exec();
  if (User) {
    const deleteUser = await userschema.deleteOne({ userName: user }).exec();

    res.status(200).json({
      status: true,
      message: "successfully deleted",
    });
  } else {
    res.status(400).json({ status: false, message: "no user found" });
  }
});
module.exports = route;
