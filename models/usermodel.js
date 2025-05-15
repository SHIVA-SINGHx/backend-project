const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        minlenght: 4
    },
    email: String,
    password: String,
    cart:{
        type: Array,
        default: []
    },
    orders:{
        type: Array,
        default: []
    },
    products:{
        type: Array,
        default:[]
    },
    isadmin: Boolean,
    contact: Number,
    picture: String,
    

})

module.exports = mongoose.model("user", userSchema);