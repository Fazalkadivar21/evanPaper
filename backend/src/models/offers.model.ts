
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  discountType: { type: String, enum: ["flat", "%", "amount", "BOGO"], required: true },
  discountValue: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
  appliesTo: { type: Object }, // products, categories, cart total > X
}, { timestamps: true });

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
