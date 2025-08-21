import express from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createOrder, getOrderById, getMyOrders, cancelOrder } from "../controllers/order.controller";

const router = express.Router();

// Place order
router.post("/", verifyJWT, createOrder);
// Get my orders
router.get("/", verifyJWT, getMyOrders);
// Get order details
router.get( "/:id", verifyJWT, getOrderById);
// Cancel order
router.put( "/:id/cancel", verifyJWT, cancelOrder);

export default router;
