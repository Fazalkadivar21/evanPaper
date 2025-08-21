import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import ProductTag from "../models/productTag.model";

const getTags = asyncHandler(async (req, res) => {
  const tags = await ProductTag.find();
  return res.status(200).json(new ApiResponse(200, tags, "Tags fetched successfully"));
});

export { getTags };
