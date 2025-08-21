import verifyRole from "../middleware/role.middleware";
import { verifyJWT } from "../middleware/auth.middleware";
import { addCategory,getCategories,deleteCategory } from "../controllers/category.controller";
import { Router } from "express";

const nCRouter = Router();
const adminRouter = Router();

adminRouter.post("/", verifyJWT, verifyRole(["admin"]), addCategory);
nCRouter.get("/", getCategories);
adminRouter.delete("/", verifyJWT, verifyRole(["admin"]), deleteCategory);

export { nCRouter, adminRouter };
