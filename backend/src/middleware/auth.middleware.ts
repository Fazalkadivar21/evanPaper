import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import User  from "../models/user.model";

interface CustomJwtPayload extends JwtPayload {
    userId: string;
    role: string;   
}

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET  as string) as CustomJwtPayload

        const user = await User.findById(decodedToken.userId).select("-password")
		
        if (!user) {
            res.clearCookie("token");
            throw new ApiError(401, "Invalid Access Token")
        }
        
        
        req.user = user;
        next()
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})
