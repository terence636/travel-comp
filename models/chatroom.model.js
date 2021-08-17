const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  room: { type: String, required: true, unique : true },
  messages: [String],
  // position : { 
  //     lat : { type: Number },
  //     lng : { type: Number }
  // },
  // invisible : { type: Boolean, default: false },
  // connected : { type: Boolean, default: false }

},{ timestamps:true });

const ChatRoom = mongoose.model("user", chatRoomSchema);

module.exports = ChatRoom;