const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique : true },
  password: { type: String, required: true },
  email : { type: String, required: true, unique : true },
  // position : { 
  //     lat : { type: Number },
  //     lng : { type: Number }
  // },
  // invisible : { type: Boolean, default: false },
  // connected : { type: Boolean, default: false }

},{ timestamps:true });

const User = mongoose.model("user", userSchema);

module.exports = User;