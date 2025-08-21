import express from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { initiatePayment, verifyPayment } from "../controllers/payment.controller";

const router = express.Router();

router.post("/initiate", verifyJWT, initiatePayment);
router.post("/verify", verifyJWT, verifyPayment);

export default router;
