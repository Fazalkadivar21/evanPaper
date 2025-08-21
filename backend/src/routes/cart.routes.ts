import { Router } from "express";
import { addToCart, getCart, updateCart, clearCart, applyOffer } from "../controllers/cart.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/add", verifyJWT, addToCart);
router.post("/apply-offer", verifyJWT, applyOffer);
router.get("/", verifyJWT, getCart);
router.patch("/update", verifyJWT, updateCart);
router.delete("/delete", verifyJWT, clearCart);

export default router;