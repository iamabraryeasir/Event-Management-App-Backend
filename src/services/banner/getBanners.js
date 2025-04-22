import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Banner } from "../../models/banner.model.js";

export const getBannersService = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalBanners = await Banner.countDocuments();
    const totalPages = Math.ceil(totalBanners / limit);

    // Get banners with pagination
    const banners = await Banner.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Create pagination metadata
    const pagination = {
      totalBanners,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return res.status(200).json(
      new ApiResponse(200, "Banners retrieved successfully", {
        banners,
        pagination,
      })
    );
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting banners"));
  }
};
