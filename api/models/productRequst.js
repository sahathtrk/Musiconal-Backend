const mongoose = require("mongoose");
const productRequestSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  total: { type: String, required: true },
  quantity: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
});
module.exports = mongoose.model("product_request", productRequestSchema);
