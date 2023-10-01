const mongoose = require("mongoose");
const tutorialSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  thubnail: { type: String, default: "public/default/default_thubnail.png" },
  link: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
module.exports = mongoose.model("tutorial", tutorialSchema);
