import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import Review from "../models/review.model";
import Product from "../models/product.model";

// Add a review
const addReview = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;
  const { rating, comment } = req.body;
  if (!productId || !rating) throw new ApiError(400, "Product ID and rating required");
  if (rating < 1 || rating > 5) throw new ApiError(400, "Rating must be 1-5");
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");
  const review = await Review.create({ userId: user._id, productId, rating, comment });
  // Update product average rating
  const reviews = await Review.find({ productId });
  const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
  product.rating = avg;
  await product.save();
  return res.status(201).json(new ApiResponse(201, review, "Review added"));
});

// Get reviews for a product
const getReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) throw new ApiError(400, "Product ID required");
  const reviews = await Review.find({ productId });
  return res.status(200).json(new ApiResponse(200, reviews, "Reviews fetched"));
});

// Delete a review (user can delete own, admin can delete any)
const deleteReview = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) throw new ApiError(404, "Review not found");
  if (review.userId.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized to delete this review");
  }
  await Review.findByIdAndDelete(id);
  // Update product average rating
  const reviews = await Review.find({ productId: review.productId });
  const product = await Product.findById(review.productId);
  if (product) {
    const avg = reviews.length > 0 ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length : 0;
    product.rating = avg;
    await product.save();
  }
  return res.status(200).json(new ApiResponse(200, null, "Review deleted"));
});

export { addReview, getReviews, deleteReview };
