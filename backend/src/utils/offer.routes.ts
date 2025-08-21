import verifyRole from "../middleware/role.middleware";
import { verifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import { addOffer, getOffers, updateOffer, deleteOffer } from "../controllers/offers.controller";
import { Router } from "express";

const nRouter = Router()
const adminRouter = Router()

nRouter.get("/", getOffers)

adminRouter.post("/", verifyJWT, verifyRole(["admin"]), upload.single("image"), addOffer)
adminRouter.put("/", verifyJWT, verifyRole(["admin"]), upload.single("image"), updateOffer)
adminRouter.delete("/", verifyJWT, verifyRole(["admin"]), deleteOffer)

export { nRouter, adminRouter }