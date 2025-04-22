import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Category } from "../../models/category.model.js";

export const getCategoryService = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(createHttpError(400, "Category ID is required"));
    }

    const category = await Category.findById(id);

    if (!category) {
      return next(createHttpError(404, "Category not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Category retrieved successfully", category));
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting category"));
  }
};
