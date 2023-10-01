const mongoose = require("mongoose");
const mentorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: { type: String, required: true },
  education: { type: String, required: true },
  doccument: [{ type: String }],
  isVerification: { type: Number, default: 1 },
  payment: { type: String, required: true },
  description: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "mentor_student" }],
  article: [{ type: mongoose.Schema.Types.ObjectId, ref: "article" }],
  tutorial: [{ type: mongoose.Schema.Types.ObjectId, ref: "tutorial" }],
});
module.exports = mongoose.model("mentor", mentorSchema);
