import { config } from "../config/config.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadImage = async (image, folder) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder,
      use_filename: true,
    });
    return result.url;
  } catch (error) {
    return null;
  }
};

export { uploadImage };
