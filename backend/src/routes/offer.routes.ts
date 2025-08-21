import express from "express";
import { getOffers } from "../controllers/offers.controller";

const router = express.Router();

// Get active offers
router.get("/", getOffers);

export default router;
