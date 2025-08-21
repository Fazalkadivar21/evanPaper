import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  transactionId: { type: String, required: true },
  method: { type: String, enum: ["UPI", "Card", "COD"], required: true },
  status: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
