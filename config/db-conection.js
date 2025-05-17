const mongoose = require("mongoose");
const config = require("config");
const debuger = require("debug")("development: mongoose");


mongoose
.connect(`${config.get("MONGODB_URI")}/backendproject`)
.then(function(){
    debuger("db connected");
    
})
.catch(function(err){
    debuger(err);
    
})

module.exports = mongoose.connection; 