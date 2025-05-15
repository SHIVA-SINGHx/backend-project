const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello this is the router page of that?")
})

module.exports = router;