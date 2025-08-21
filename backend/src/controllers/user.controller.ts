import { Request, Response } from "express";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function secure(user: any) {
  const obj = user.toObject();
  delete obj.passwordHash;
  return obj
}

// POST /api/users/register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password)
    throw new ApiError(400, "All fields are required");

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

  if (existingUser)
    throw new ApiError(409, "User already exists with this email or phone");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, passwordHash });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(201).json(new ApiResponse(201, secure(user), "Registration successful"));
});

// POST /api/users/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;

  if ((!email && !phone) || !password)
    throw new ApiError(400, "Email or phone and password are required");

  const user = await User.findOne(email ? { email } : { phone });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.json(new ApiResponse(200, secure(user), "Login successful"));
});

// POST /api/users/logout
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.json(new ApiResponse(200, null, "Logout successful"));
});

// PUT /api/users/update
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");
  const { name, email, password } = req.body;
  const updateData: any = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.passwordHash = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  }).select("-passwordHash");
  if (!user) throw new ApiError(404, "User not found");
  res.json(new ApiResponse(200, user, "User updated successfully"));
});
