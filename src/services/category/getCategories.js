import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Category } from "../../models/category.model.js";

export const getCategoriesService = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit);

    // Get categories with pagination
    const categories = await Category.find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    // Create pagination metadata
    const pagination = {
      totalCategories,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return res.status(200).json(
      new ApiResponse(200, "Categories retrieved successfully", {
        categories,
        pagination,
      })
    );
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting categories"));
  }
};