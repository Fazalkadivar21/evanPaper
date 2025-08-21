import { verifyJWT } from "../middleware/auth.middleware";
import {register,login,logout,updateUser} from "../controllers/user.controller"
import { Router } from "express";

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",verifyJWT,logout)
router.post("/update",verifyJWT,updateUser)

export default router