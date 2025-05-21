const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 4,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
});

module.exports = mongoose.model("admin", adminSchema);