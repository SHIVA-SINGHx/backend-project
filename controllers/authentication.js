const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {tokens} = require("../utils/tokens");
const userModel = require("../models/usermodel");
const { model } = require("mongoose");



module.exports.registerUser = async function(req, res) {
  try {
    const { name, email, password } = req.body;    
    let user = await userModel.findOne({ email: email });
    
    if (user) return res.status(400).send("You already have an account");

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
        if (err) return res.status(500).send("Hashing error");

        const newUser = await userModel.create({
          name,
          email,
          password: hash
        });

        const token = tokens(newUser);
        res.cookie("token", token);
        res.redirect("/user/login");
      });
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).send("Internal Server Error");
  }

};

module.exports.loginUser = async function(req, res){
  let {email, password} = req.body;

  let user = await userModel.findOne({email: email})
  if(!user) return res.send("Incorrect details")


    bcrypt.compare(password, user.password, (err, result) => {
      
      if(result){
       let token = tokens(user);
       res.cookie("token", token);
       res.send("you can login")
      } else{
        res.send("Please check the details? ");
      }
       
    })
}

module.exports.logoutUser = function(req, res) {
  res.clearCookie("token");
  res.redirect("/user/login")
};
