import express from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { addReview, getReviews, deleteReview } from "../controllers/review.controller";

const router = express.Router();

// Add review
router.post("/:productId", verifyJWT, addReview);
// Get reviews for a product
router.get("/:productId", getReviews);
// Delete review
router.delete("/:id", verifyJWT, deleteReview);

export default router;
