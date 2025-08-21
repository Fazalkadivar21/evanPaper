
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// Add product to cart (validates product and quantity)
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user;

  if (!productId || !quantity || quantity < 1) {
    throw new ApiError(400, "Product ID and valid quantity are required");
  }

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");
  if (product.stock < quantity) throw new ApiError(400, "Insufficient stock");

  let cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    cart = await Cart.create({ userId: user._id, items: [] });
  }
  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  await cart.save();
  return res.status(200).json(new ApiResponse(200, cart, "Product added to cart successfully"));
});

// Get current user's cart
const getCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = await Cart.findOne({ userId: user._id }).populate("items.productId");
  if (!cart) throw new ApiError(404, "Cart is empty");
  return res.status(200).json(new ApiResponse(200, cart, "Cart retrieved successfully"));
});

// Update quantity of a product in cart
const updateCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user;
  if (!productId || !quantity || quantity < 1) {
    throw new ApiError(400, "Product ID and valid quantity are required");
  }
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");
  if (product.stock < quantity) throw new ApiError(400, "Insufficient stock");
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) throw new ApiError(404, "Cart not found");
  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
  if (itemIndex === -1) throw new ApiError(404, "Product not in cart");
  cart.items[itemIndex].quantity = quantity;
  await cart.save();
  return res.status(200).json(new ApiResponse(200, cart, "Cart updated successfully"));
});

// Remove a product from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = req.user;
  if (!productId) throw new ApiError(400, "Product ID is required");
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) throw new ApiError(404, "Cart not found");
  cart.items.pull({ productId });
  await cart.save();
  return res.status(200).json(new ApiResponse(200, cart, "Product removed from cart"));
});

// Clear the cart
const clearCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) throw new ApiError(404, "Cart not found");
  cart.items.splice(0, cart.items.length);
  await cart.save();
  return res.status(200).json(new ApiResponse(200, cart, "Cart cleared"));
});

import Offer from "../models/offers.model";

// Apply offer to cart
const applyOffer = asyncHandler(async (req, res) => {
  const user = req.user;
  const { offerId } = req.body;
  if (!offerId) throw new ApiError(400, "Offer ID is required");
  const offer = await Offer.findById(offerId);
  if (!offer) throw new ApiError(404, "Offer not found");
  const now = new Date();
  if (now < offer.validFrom || now > offer.validTo) throw new ApiError(400, "Offer not active");
  const cart = await Cart.findOne({ userId: user._id }).populate("items.productId");
  if (!cart) throw new ApiError(404, "Cart not found");
  // Calculate cart total
  let total = 0;
  for (const item of cart.items) {
    // item.productId is populated as Product | ObjectId
    const product = item.productId as any;
    if (!product || typeof product.price !== "number") throw new ApiError(500, "Product not populated in cart");
    total += typeof product.discountPrice === "number" ? product.discountPrice * item.quantity : product.price * item.quantity;
  }
  // Check if offer applies (basic: appliesTo.cartTotal, products, categories)
  let discount = 0;
  if (offer.appliesTo?.cartTotal && total < offer.appliesTo.cartTotal) {
    throw new ApiError(400, `Offer applies only to carts above ${offer.appliesTo.cartTotal}`);
  }
  if (offer.discountType === "%") {
    discount = (total * offer.discountValue) / 100;
  } else if (offer.discountType === "flat" || offer.discountType === "amount") {
    discount = offer.discountValue;
  } else if (offer.discountType === "BOGO") {
    // BOGO logic can be implemented as needed
    discount = 0;
  }
  // Don't allow discount to exceed total
  if (discount > total) discount = total;
  return res.status(200).json(new ApiResponse(200, { total, discount, final: total - discount }, "Offer applied"));
});

export { addToCart, getCart, updateCart, removeFromCart, clearCart, applyOffer };
