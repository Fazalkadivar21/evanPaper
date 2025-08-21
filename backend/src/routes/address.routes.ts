import { verifyJWT } from "../middleware/auth.middleware";
import { Router } from "express";
import { getAddress,addAddress, updateAddress, deleteAddress } from "../controllers/address.controller";

const router = Router();

router.use(verifyJWT);

router.get("/", getAddress);
router.post("/", addAddress);
router.patch("/update", updateAddress);
router.delete("/delete", deleteAddress);

export default router;