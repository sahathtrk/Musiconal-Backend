const mongoose = require("mongoose");
const storeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  payment: { type: String, default: "" },
  picture: { type: String, default: "public/default/default_store.png" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});
module.exports = mongoose.model("store", storeSchema);
