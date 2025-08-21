import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import Order from "../models/order.model";
import Product from "../models/product.model";

// Create a new order (all fields are required, all data is verified)
const createOrder = asyncHandler(async (req, res) => {
  const { items, addressId } = req.body;
  const user = req.user;

  if (!user || !items || !Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, "Invalid order data");
  }

  // Validate address
  const Address = require("../models/adress.model").default;
  const address = await Address.findOne({ _id: addressId, userId: user._id });
  if (!address) {
    throw new ApiError(400, "Invalid address");
  }

  let totalAmount = 0;
  let orderItems = [];
  for (const item of items) {
    const { productId, quantity } = item;
    if (!productId || !quantity || quantity < 1) {
      throw new ApiError(400, "Invalid product or quantity");
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(400, `Product not found: ${productId}`);
    }
    if (product.stock < quantity) {
      throw new ApiError(400, `Insufficient stock for product: ${product.name}`);
    }
    // Use backend price, not client
    const price = product.discountPrice || product.price;
    totalAmount += price * quantity;
    orderItems.push({ productId, price, quantity });
  }

  let discountApplied = 0;

  const order = await Order.create({
    userId: user._id,
    items: orderItems,
    totalAmount,
    discountApplied,
    addressId,
    status: "placed",
    paymentStatus: "pending",
  });

  // Decrement product stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
  }

  return res.status(201).json(new ApiResponse(201, order, "Order placed successfully."));
});

// Get order by ID (only owner or admin)
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");
  if (order.userId.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized");
  }
  return res.status(200).json(new ApiResponse(200, order, "Order details"));
});

const getMyOrders = asyncHandler(async (req, res) => {
  const user = req.user;
  const orders = await Order.find({ userId: user._id });
  if (!orders) throw new ApiError(404, "Order not found");
  if (orders[0].userId.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized");
  }
  return res.status(200).json(new ApiResponse(200, orders, "My orders"));
});

// Cancel order (only owner, only if not shipped/delivered)
const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");
  if (order.userId.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized");
  }
  if (["shipped", "delivered", "cancelled"].includes(order.status)) {
    throw new ApiError(400, "Order cannot be cancelled");
  }
  order.status = "cancelled";
  await order.save();
  // Optionally: restock products
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
  }
  return res.status(200).json(new ApiResponse(200, order, "Order cancelled"));
});

export { createOrder, getOrderById, getMyOrders, cancelOrder };