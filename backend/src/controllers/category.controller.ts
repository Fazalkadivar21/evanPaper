import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import Category from "../models/category.model";
import Product from "../models/product.model";

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(400, "Category name is required");
  }
  const category = await Category.create({
    name,
  });
  if (!category) {
    throw new ApiError(400, "Category creation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category created successfully"));
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories retrieved successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.body;

  await Product.deleteMany({ category: categoryId });
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});

export {
  addCategory,
  getCategories,
  deleteCategory,
};
