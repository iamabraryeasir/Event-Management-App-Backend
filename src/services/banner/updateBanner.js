import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Banner } from "../../models/banner.model.js";
import { uploadToCloudinary } from "../../helpers/cloudinary.js";

export const updateBannerService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return next(createHttpError(400, "Banner ID is required"));
    }

    if (!name?.trim()) {
      return next(createHttpError(400, "Banner name is required"));
    }

    // Check if banner exists
    const banner = await Banner.findById(id);
    if (!banner) {
      return next(createHttpError(404, "Banner not found"));
    }

    // Prepare update data
    const updateData = {
      name: name.trim(),
    };

    if (req.file) {
      const image = await uploadToCloudinary(req.file.path, "banners");
      if (image?.secure_url) {
        updateData.image = image.secure_url;
      }
    }

    // Update the banner
    const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Banner updated successfully", updatedBanner)
      );
  } catch (error) {
    return next(createHttpError(500, "Internal server error updating banner"));
  }
};