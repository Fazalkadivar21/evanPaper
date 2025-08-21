import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string, options = {}) => {
	try {
		const result = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto", // auto-detects file type (image/video/etc)
			...options,
		});
        fs.unlinkSync(localFilePath)
		return result;
	} catch (error) {
        fs.unlinkSync(localFilePath)
		throw error;
	}
};

const deleteOnCloudinary = async (cloudinaryUrl: string, options = {}) => {
	try {
		const lastSegment = cloudinaryUrl.split("/").pop();
		if (!lastSegment) {
			throw new Error("Invalid Cloudinary URL: cannot extract publicId.");
		}
		const publicId = lastSegment.split(".")[0];
		const { result } = await cloudinary.uploader.destroy(publicId, options);

		if (result !== "ok") {
			throw new Error(`Cloudinary deletion failed: ${result}`);
		}

		return result;

	} catch (error) {
		throw new Error("Failed to delete image from Cloudinary.");
	}
};


export { uploadOnCloudinary, deleteOnCloudinary };