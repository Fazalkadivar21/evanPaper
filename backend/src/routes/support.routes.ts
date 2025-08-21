import express from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createTicket, getMyTickets, getTicketById } from "../controllers/support.controller";

const router = express.Router();

// Create support ticket
router.post("/", verifyJWT, createTicket);
// Get my tickets
router.get("/", verifyJWT, getMyTickets);
// Get ticket by ID
router.get("/:id", verifyJWT, getTicketById);

export default router;
