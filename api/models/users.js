const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profile: { type: String, default: "public/default/default.png" },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "store", default: null },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mentor",
    default: null,
  },
});
module.exports = mongoose.model("user", usersSchema);
