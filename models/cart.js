const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    unique: true 
  }
});

module.exports = mongoose.model("Cart", cartSchema);
