const mongoose = require("mongoose");
/**
 * 0 is disagree
 * 1 is agree
 * 2 in process
 */
const transactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product_request" }],
  uploaded: [{ type: String }],
  total: { type: Number, default: 0 },
  status: [{ type: Number, default: 2 }],
  comment: { type: String, default: "" },
});
module.exports = mongoose.model("transaction", transactionSchema);
