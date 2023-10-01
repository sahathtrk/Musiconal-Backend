const mongoose = require("mongoose");
const mentorStudentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  students: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
  messages: [{type: mongoose.Schema.Types.ObjectId, ref:"message"}],
  price: { type: Number, required: true },
  updatedAt: {type: Number, required: true},
  payment: {type: String},
  confirmation: {type: Boolean, default: false}
});
module.exports = mongoose.model("mentor_student", mentorStudentSchema);
