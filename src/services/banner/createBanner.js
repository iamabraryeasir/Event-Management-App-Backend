import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Banner } from "../../models/banner.model.js";
import { uploadToCloudinary } from "../../helpers/cloudinary.js";

export const createBannerService = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return next(createHttpError(400, "Banner name is required"));
    }

    if (!req.file) {
      return next(createHttpError(400, "Banner image is required"));
    }

    const image = await uploadToCloudinary(req.file.path, "banners");
    if (!image?.secure_url) {
      return next(createHttpError(500, "Failed to upload banner image"));
    }

    const banner = await Banner.create({
      name: name.trim(),
      image: image.secure_url,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Banner created successfully", banner));
  } catch (error) {
    return next(createHttpError(500, "Internal server error creating banner"));
  }
};