
import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["open", "in-progress", "resolved", "closed"], default: "open" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const SupportTicket = mongoose.model("SupportTicket", supportSchema);

export default SupportTicket;
