import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import User from "../models/user.model";
import Product from "../models/product.model";
import Order from "../models/order.model";
import Offer from "../models/offers.model";
import Payment from "../models/payment.model";
import Review from "../models/review.model";
import SupportTicket from "../models/support.model";

// Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.status(200).json(new ApiResponse(200, users, "All users"));
});
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, user, "User details"));
});
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role, banned } = req.body;
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  if (role) user.role = role;
  await user.save();
  return res.status(200).json(new ApiResponse(200, user, "User updated"));
});

// Products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(new ApiResponse(200, products, "All products"));
});
const createProduct = asyncHandler(async (req, res) => {
  // Use addProduct logic from product.controller
});
const updateProduct = asyncHandler(async (req, res) => {
  // Use updateProduct logic from product.controller
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");
  return res.status(200).json(new ApiResponse(200, null, "Product deleted"));
});

// Orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json(new ApiResponse(200, orders, "All orders"));
});
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");
  return res.status(200).json(new ApiResponse(200, order, "Order details"));
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");
  order.status = status;
  await order.save();
  return res.status(200).json(new ApiResponse(200, order, "Order status updated"));
});
const refundOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Implement refund logic
  return res.status(200).json(new ApiResponse(200, null, "Order refunded (stub)"));
});

// Offers
const getAllOffers = asyncHandler(async (req, res) => {
  const offers = await Offer.find();
  return res.status(200).json(new ApiResponse(200, offers, "All offers"));
});
const createOffer = asyncHandler(async (req, res) => {
  // Use addOffer logic from offers.controller
});
const updateOffer = asyncHandler(async (req, res) => {
  // Use updateOffer logic from offers.controller
});
const deleteOffer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const offer = await Offer.findByIdAndDelete(id);
  if (!offer) throw new ApiError(404, "Offer not found");
  return res.status(200).json(new ApiResponse(200, null, "Offer deleted"));
});

// Payments
const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  return res.status(200).json(new ApiResponse(200, payments, "All payments"));
});
const getPaymentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payment = await Payment.findById(id);
  if (!payment) throw new ApiError(404, "Payment not found");
  return res.status(200).json(new ApiResponse(200, payment, "Payment details"));
});

// Reviews
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  return res.status(200).json(new ApiResponse(200, reviews, "All reviews"));
});
const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) throw new ApiError(404, "Review not found");
  return res.status(200).json(new ApiResponse(200, null, "Review deleted"));
});

// Support
const getAllSupportTickets = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find();
  return res.status(200).json(new ApiResponse(200, tickets, "All support tickets"));
});
const assignSupportTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { adminId } = req.body;
  if (!adminId) throw new ApiError(400, "adminId is required");
  const ticket = await SupportTicket.findById(id);
  if (!ticket) throw new ApiError(404, "Ticket not found");
  ticket.assignedTo = adminId;
  ticket.status = "in-progress";
  await ticket.save();
  return res.status(200).json(new ApiResponse(200, ticket, "Support ticket assigned"));
});
const updateSupportTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;
  const ticket = await SupportTicket.findById(id);
  if (!ticket) throw new ApiError(404, "Ticket not found");
  if (status) ticket.status = status;
  if (assignedTo) ticket.assignedTo = assignedTo;
  await ticket.save();
  return res.status(200).json(new ApiResponse(200, ticket, "Ticket updated"));
});

export {
  getAllUsers, getUserById, updateUser,
  getAllProducts, createProduct, updateProduct, deleteProduct,
  getAllOrders, getOrderById, updateOrderStatus, refundOrder,
  getAllOffers, createOffer, updateOffer, deleteOffer,
  getAllPayments, getPaymentById,
  getAllReviews, deleteReview,
  getAllSupportTickets, updateSupportTicket,
  assignSupportTicket
};
