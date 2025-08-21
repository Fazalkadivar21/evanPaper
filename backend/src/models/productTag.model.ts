import mongoose from "mongoose";

const productTagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ProductTag = mongoose.model("ProductTag", productTagSchema);

export default ProductTag;
