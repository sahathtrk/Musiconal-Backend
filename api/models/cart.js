const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  room: [{ type: mongoose.Schema.Types.ObjectId, ref: "room" }],
  total: { type: Number, default: 0 },
});
module.exports = mongoose.model("product_request", cartSchema);
