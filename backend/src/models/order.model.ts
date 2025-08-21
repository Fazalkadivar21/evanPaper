
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  discountApplied: { type: Number, default: 0 },
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
  status: { type: String, enum: ["placed", "shipped", "delivered", "cancelled" ], default: "placed" },
  paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
  paymentId: { type: String },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
