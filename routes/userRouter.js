const express = require("express");
const router = express.Router();
const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {tokens } = require("../utils/tokens");
const {registerUser, loginUser, logoutUser, homePage} = require("../controllers/authentication");

router.get("/", (req, res) => {
  res.send("this is the user page>>>")
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/login", (req, res) => {
    res.render("login"); 
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/user/login");
});


router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout",logoutUser);


module.exports = router;