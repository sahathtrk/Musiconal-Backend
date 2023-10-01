const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  price: { type: String, required: true },
  name: { type: String, required: true },
  stok: { type: Number, required: true },
  picture: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = mongoose.model("product", productSchema);
