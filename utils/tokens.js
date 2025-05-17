const jwt = require("jsonwebtoken");
const config = require("config");

function tokens(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email
    },
    config.get("JWT_KEY")
  );
}

module.exports = { tokens };