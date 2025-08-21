import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import { Router } from "express";
import verifyRole from "../middleware/role.middleware";

const nRouter = Router();
const adminRouter = Router();

nRouter.get("/", getProducts);
nRouter.get("/:id", getProductById);

adminRouter.post("/", verifyJWT, verifyRole(["admin"]), upload.single("image"), addProduct);
adminRouter.patch("/:id", verifyJWT, verifyRole(["admin"]), upload.single("image"), updateProduct);
adminRouter.delete("/:id", verifyJWT, verifyRole(["admin"]), deleteProduct);

export { nRouter, adminRouter };
