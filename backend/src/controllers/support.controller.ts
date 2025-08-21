import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import SupportTicket from "../models/support.model";

// Create support ticket
const createTicket = asyncHandler(async (req, res) => {
  const user = req.user;
  const { orderId, issueType, description } = req.body;
  if (!issueType || !description) throw new ApiError(400, "Issue type and description required");
  const ticket = await SupportTicket.create({ userId: user._id, orderId, issueType, description });
  return res.status(201).json(new ApiResponse(201, ticket, "Ticket created"));
});

// Get my tickets
const getMyTickets = asyncHandler(async (req, res) => {
  const user = req.user;
  const tickets = await SupportTicket.find({ userId: user._id });
  return res.status(200).json(new ApiResponse(200, tickets, "My tickets"));
});

// Get ticket by ID
const getTicketById = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const ticket = await SupportTicket.findById(id);
  if (!ticket) throw new ApiError(404, "Ticket not found");
  if (ticket.userId.toString() !== user._id.toString() && user.role !== "admin" && user.role !== "support") {
    throw new ApiError(403, "Not authorized");
  }
  return res.status(200).json(new ApiResponse(200, ticket, "Ticket details"));
});

export { createTicket, getMyTickets, getTicketById };
