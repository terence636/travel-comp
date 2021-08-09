const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  rating: Number,
  lat: { type: Number, required: true },
  long: { type: Number, required: true },

},{ timestamps:true });

const Pin = mongoose.model("pin", pinSchema);

module.exports = Pin;