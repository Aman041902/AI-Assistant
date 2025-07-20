import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(file);
    fs.unlinkSync(file); // delete local file after upload
    console.log("Uploading file to Cloudinary:", file);

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export default uploadCloudinary;
