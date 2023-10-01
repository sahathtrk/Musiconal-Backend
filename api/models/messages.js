const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  message: {type: String, required: true},
  date: {type: String, required: true},
  isStudent: {type: Boolean, default: false},
});
module.exports = mongoose.model("message", messageSchema);
