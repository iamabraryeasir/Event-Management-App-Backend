import { config } from "../config/config.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadToCloudinary = async (filePath, folder) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
    });

    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

export { uploadToCloudinary };
