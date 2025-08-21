
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductTag" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  specifications: { type: Object }, // JSON: pages, size, binding, etc.
  rating: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
