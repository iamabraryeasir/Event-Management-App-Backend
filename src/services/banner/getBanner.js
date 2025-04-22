import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Banner } from "../../models/banner.model.js";

export const getBannerService = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(createHttpError(400, "Banner ID is required"));
    }

    const banner = await Banner.findById(id);

    if (!banner) {
      return next(createHttpError(404, "Banner not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Banner retrieved successfully", banner));
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting banner"));
  }
};