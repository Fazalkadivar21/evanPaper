import express from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import verifyRole from "../middleware/role.middleware";
import * as adminController from "../controllers/admin.controller";

const router = express.Router();

// User management
router.get("/users", verifyJWT, verifyRole(["admin"]), adminController.getAllUsers);
router.get("/users/:id", verifyJWT, verifyRole(["admin"]), adminController.getUserById);
router.put("/users/:id", verifyJWT, verifyRole(["admin"]), adminController.updateUser);

// Product management
router.get("/products", verifyJWT, verifyRole(["admin"]), adminController.getAllProducts);
router.post("/products", verifyJWT, verifyRole(["admin"]), adminController.createProduct);
router.put("/products/:id", verifyJWT, verifyRole(["admin"]), adminController.updateProduct);
router.delete("/products/:id", verifyJWT, verifyRole(["admin"]), adminController.deleteProduct);

// Order management
router.get("/orders", verifyJWT, verifyRole(["admin"]), adminController.getAllOrders);
router.get("/orders/:id", verifyJWT, verifyRole(["admin"]), adminController.getOrderById);
router.put("/orders/:id/status", verifyJWT, verifyRole(["admin"]), adminController.updateOrderStatus);
router.put("/orders/:id/refund", verifyJWT, verifyRole(["admin"]), adminController.refundOrder);

// Offer management
router.get("/offers", verifyJWT, verifyRole(["admin"]), adminController.getAllOffers);
router.post("/offers", verifyJWT, verifyRole(["admin"]), adminController.createOffer);
router.put("/offers/:id", verifyJWT, verifyRole(["admin"]), adminController.updateOffer);
router.delete("/offers/:id", verifyJWT, verifyRole(["admin"]), adminController.deleteOffer);

// Payment management
router.get("/payments", verifyJWT, verifyRole(["admin"]), adminController.getAllPayments);
router.get("/payments/:id", verifyJWT, verifyRole(["admin"]), adminController.getPaymentById);

// Review management
router.get("/reviews", verifyJWT, verifyRole(["admin"]), adminController.getAllReviews);
router.delete("/reviews/:id", verifyJWT, verifyRole(["admin"]), adminController.deleteReview);

// Support management
router.get("/support", verifyJWT, verifyRole(["admin"]), adminController.getAllSupportTickets);

// Assign support ticket to admin
router.post("/support/:id/assign", verifyJWT, verifyRole(["admin"]), adminController.assignSupportTicket);


export default router;
