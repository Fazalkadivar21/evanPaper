
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import Address from "../models/adress.model";
import { ApiResponse } from "../utils/ApiResponse";

// Helper: validate pincode (6 digits, India)
function isValidPincode(pincode : string) {
  return /^[1-9][0-9]{5}$/.test(pincode);
}

const addAddress = asyncHandler(async (req, res) => {
  const { name, line1, line2, city, state, pincode, country, isDefault } = req.body;
  const user = req.user;

  if (!name || !line1 || !city || !state || !pincode || !country) {
    throw new ApiError(400, "All fields except line2 and isDefault are required");
  }
  if (!isValidPincode(pincode)) {
    throw new ApiError(400, "Invalid pincode");
  }
  if (typeof isDefault !== "undefined" && typeof isDefault !== "boolean") {
    throw new ApiError(400, "isDefault must be boolean");
  }

  // If isDefault, unset previous default
  if (isDefault) {
    await Address.updateMany({ userId: user._id, isDefault: true }, { isDefault: false });
  }

  const newAddress = await Address.create({
    userId: user._id,
    name,
    line1,
    line2,
    city,
    state,
    pincode,
    country,
    isDefault: !!isDefault,
  });

  if (!newAddress) {
    throw new ApiError(400, "Address not created");
  }

  return res.status(201).json(new ApiResponse(201, newAddress, "Address added successfully"));
});

const updateAddress = asyncHandler(async (req, res) => {
  const { addressId, name, line1, line2, city, state, pincode, country, isDefault } = req.body;
  const user = req.user;
  if (!addressId) throw new ApiError(400, "Address ID is required");
  const address = await Address.findById(addressId);
  if (!address) throw new ApiError(404, "Address not found");
  if (address.userId.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this address");
  }
  if (pincode && !isValidPincode(pincode)) {
    throw new ApiError(400, "Invalid pincode");
  }
  if (typeof isDefault !== "undefined" && typeof isDefault !== "boolean") {
    throw new ApiError(400, "isDefault must be boolean");
  }
  if (isDefault) {
    await Address.updateMany({ userId: user._id, isDefault: true }, { isDefault: false });
  }
  if (name) address.name = name;
  if (line1) address.line1 = line1;
  if (typeof line2 !== "undefined") address.line2 = line2;
  if (city) address.city = city;
  if (state) address.state = state;
  if (pincode) address.pincode = pincode;
  if (country) address.country = country;
  if (typeof isDefault !== "undefined") address.isDefault = isDefault;
  await address.save();
  return res.status(200).json(new ApiResponse(200, address, "Address updated successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.body;
  const user = req.user;
  if (!addressId) throw new ApiError(400, "Address ID is required");
  const address = await Address.findById(addressId);
  if (!address) throw new ApiError(404, "Address not found");
  if (address.userId.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this address");
  }
  await Address.findByIdAndDelete(addressId);
  return res.status(200).json(new ApiResponse(200, null, "Address deleted successfully"));
});

const getAddress = asyncHandler(async (req, res) => {
  const user = req.user;
  const addresses = await Address.find({ userId: user._id });
  return res.status(200).json(new ApiResponse(200, addresses, "Addresses retrieved successfully"));
});

export {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress
};