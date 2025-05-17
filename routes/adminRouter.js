const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminmodel");


if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res)=>{
        res.send("hello ")
    })
}


router.get("/", (req, res) => {
    res.send("hello this is the owner page?")
})

module.exports = router;