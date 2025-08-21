import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const verifyRole = (roles: string[]) => 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role)) {
            return next(new ApiError(403, "Forbidden"));
        }
        next();
    });

export default verifyRole;
