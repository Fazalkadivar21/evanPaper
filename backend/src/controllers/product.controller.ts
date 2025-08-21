import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import Product from "../models/product.model";
import Category from "../models/category.model";
import ProductTag from "../models/productTag.model";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/Cloudinary";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products.length === 0) throw new ApiError(400, "No Products found");
  return res
    .status(200)
    .json(new ApiResponse(200, products, "products fetched successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, tags, stock, specifications, discountPrice } = req.body;
  const image = req.file;

  // Validate required fields
  if (!name || !price || !description || !category || !stock) {
    throw new ApiError(400, "All fields (name, price, description, category, stock) are required");
  }
  if (!image) {
    throw new ApiError(400, "Image is required");
  }
  if (typeof price !== "number" || price <= 0) {
    throw new ApiError(400, "Price must be a positive number");
  }
  if (discountPrice && (typeof discountPrice !== "number" || discountPrice < 0 || discountPrice > price)) {
    throw new ApiError(400, "Discount price must be a non-negative number less than or equal to price");
  }
  if (typeof stock !== "number" || stock < 0) {
    throw new ApiError(400, "Stock must be a non-negative number");
  }

  // Check for unique product name
  const existing = await Product.findOne({ name });
  if (existing) {
    throw new ApiError(400, "Product name already exists");
  }

  // Validate category
  const categoryDoc = await Category.findById(category);
  if (!categoryDoc) {
    throw new ApiError(400, "Invalid category");
  }

  // Validate tags (if provided)
  let tagIds = [];
  if (tags && Array.isArray(tags)) {
    for (const tagId of tags) {
      const tag = await ProductTag.findById(tagId);
      if (!tag) throw new ApiError(400, `Invalid tag: ${tagId}`);
      tagIds.push(tagId);
    }
  }

  // Validate specifications (if provided)
  let specs = {};
  if (specifications) {
    try {
      specs = typeof specifications === "string" ? JSON.parse(specifications) : specifications;
    } catch {
      throw new ApiError(400, "Invalid specifications JSON");
    }
  }

  const cloudinaryImage = await uploadOnCloudinary(image.path);
  if (!cloudinaryImage || !cloudinaryImage.url) {
    throw new ApiError(400, "Image upload failed");
  }

  const product = await Product.create({
    name,
    price,
    description,
    image: cloudinaryImage.url,
    category,
    tags: tagIds,
    stock,
    specifications: specs,
    discountPrice,
  });

  return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, tags, stock, specifications, discountPrice } = req.body;
  const image = req.file;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (name && name !== product.name) {
    const existing = await Product.findOne({ name });
    if (existing) throw new ApiError(400, "Product name already exists");
    product.name = name;
  }
  if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) throw new ApiError(400, "Price must be a positive number");
    product.price = price;
  }
  if (discountPrice !== undefined) {
    if (typeof discountPrice !== "number" || discountPrice < 0 || (price !== undefined && discountPrice > price) || (price === undefined && discountPrice > product.price)) {
      throw new ApiError(400, "Discount price must be a non-negative number less than or equal to price");
    }
    product.discountPrice = discountPrice;
  }
  if (stock !== undefined) {
    if (typeof stock !== "number" || stock < 0) throw new ApiError(400, "Stock must be a non-negative number");
    product.stock = stock;
  }
  if (description) product.description = description;
  if (category) {
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) throw new ApiError(400, "Invalid category");
    product.category = category;
  }
  if (tags && Array.isArray(tags)) {
    let tagIds = [];
    for (const tagId of tags) {
      const tag = await ProductTag.findById(tagId);
      if (!tag) throw new ApiError(400, `Invalid tag: ${tagId}`);
      tagIds.push(tagId);
    }
    product.tags = tagIds;
  }
  if (specifications) {
    try {
      product.specifications = typeof specifications === "string" ? JSON.parse(specifications) : specifications;
    } catch {
      throw new ApiError(400, "Invalid specifications JSON");
    }
  }
  if (image) {
    await deleteOnCloudinary(product.image);
    const cloudinaryImage = await uploadOnCloudinary(image.path);
    if (!cloudinaryImage || !cloudinaryImage.url) {
      throw new ApiError(400, "Image upload failed");
    }
    product.image = cloudinaryImage.url;
  }
  await product.save();
  return res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
});

const deleteProduct = asyncHandler(async (req,res)=>{
    /* 
        1. veriry the product exists
        2. delete the product image
        3. delete the product and send res
    */
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
       throw new ApiError(400, "Invalid product ID");
   }

   const product = await Product.findById(id);

   if (!product) {
       throw new ApiError(404, "Product not found");
   }

   await deleteOnCloudinary(product.image);
   await Product.findByIdAndDelete(id);

   return res
       .status(200)
       .json(new ApiResponse(200, null, "Product deleted successfully"));
});


export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
