const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        minlenght: 4
    },
    email: String,
    password: String,
    products:{
        type: Array,
        default:[]
    },
    picture: String,
    gstin: String

})

module.exports = mongoose.model("admin", adminSchema);