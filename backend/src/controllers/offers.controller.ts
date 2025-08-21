
import { isValidObjectId } from "mongoose";
import Offer from "../models/offers.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const addOffer = asyncHandler(async (req, res) => {
  const { title, description, discountType, discountValue, validFrom, validTo, appliesTo } = req.body;

  if (!title || !discountType || discountValue === undefined || !validFrom || !validTo) {
    throw new ApiError(400, "All fields (title, discountType, discountValue, validFrom, validTo) are required");
  }
  if (!["flat", "%", "amount", "BOGO"].includes(discountType)) {
    throw new ApiError(400, "Invalid discountType");
  }
  if (typeof discountValue !== "number" || discountValue < 0) {
    throw new ApiError(400, "discountValue must be a non-negative number");
  }
  const from = new Date(validFrom);
  const to = new Date(validTo);
  if (isNaN(from.getTime()) || isNaN(to.getTime()) || from >= to) {
    throw new ApiError(400, "Invalid validFrom/validTo dates");
  }
  let applies = {};
  if (appliesTo) {
    try {
      applies = typeof appliesTo === "string" ? JSON.parse(appliesTo) : appliesTo;
    } catch {
      throw new ApiError(400, "Invalid appliesTo JSON");
    }
  }
  const offer = await Offer.create({
    title,
    description,
    discountType,
    discountValue,
    validFrom: from,
    validTo: to,
    appliesTo: applies,
  });
  if (!offer) throw new ApiError(400, "Error creating offer");
  return res.status(201).json(new ApiResponse(201, offer, "Offer created successfully"));
});

const getOffers = asyncHandler(async (req, res) => {
  const now = new Date();
  const offers = await Offer.find({ validFrom: { $lte: now }, validTo: { $gte: now } });
  return res.status(200).json(new ApiResponse(200, offers, "Active offers fetched successfully."));
});

const updateOffer = asyncHandler(async (req, res) => {
  const { offerId, title, description, discountType, discountValue, validFrom, validTo, appliesTo } = req.body;
  if (!isValidObjectId(offerId)) throw new ApiError(400, "Invalid offerId");
  const offer = await Offer.findById(offerId);
  if (!offer) throw new ApiError(404, "Offer not found");
  if (title) offer.title = title;
  if (description) offer.description = description;
  if (discountType) {
    if (!["flat", "%", "amount", "BOGO"].includes(discountType)) throw new ApiError(400, "Invalid discountType");
    offer.discountType = discountType;
  }
  if (discountValue !== undefined) {
    if (typeof discountValue !== "number" || discountValue < 0) throw new ApiError(400, "discountValue must be a non-negative number");
    offer.discountValue = discountValue;
  }
  if (validFrom) {
    const from = new Date(validFrom);
    if (isNaN(from.getTime())) throw new ApiError(400, "Invalid validFrom date");
    offer.validFrom = from;
  }
  if (validTo) {
    const to = new Date(validTo);
    if (isNaN(to.getTime())) throw new ApiError(400, "Invalid validTo date");
    offer.validTo = to;
  }
  if (appliesTo) {
    try {
      offer.appliesTo = typeof appliesTo === "string" ? JSON.parse(appliesTo) : appliesTo;
    } catch {
      throw new ApiError(400, "Invalid appliesTo JSON");
    }
  }
  await offer.save();
  return res.status(200).json(new ApiResponse(200, offer, "Offer updated successfully"));
});

const deleteOffer = asyncHandler(async (req, res) => {
  const { offerId } = req.body;
  if (!isValidObjectId(offerId)) throw new ApiError(400, "Invalid offerId");
  const offer = await Offer.findByIdAndDelete(offerId);
  if (!offer) throw new ApiError(404, "Offer not found");
  return res.status(200).json(new ApiResponse(200, null, "Offer deleted successfully."));
});

export { addOffer, getOffers, updateOffer, deleteOffer };
