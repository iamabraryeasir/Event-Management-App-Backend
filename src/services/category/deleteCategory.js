import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Category } from "../../models/category.model.js";
import { Event } from "../../models/event.model.js";

export const deleteCategoryService = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return next(createHttpError(400, "Category ID is required"));
    }

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return next(createHttpError(404, "Category not found"));
    }

    // Check if category is being used by any events
    const eventsUsingCategory = await Event.countDocuments({ category: id });
    if (eventsUsingCategory > 0) {
      return next(createHttpError(400, "Cannot delete category as it is being used by events"));
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    return res.status(200).json(
      new ApiResponse(200, "Category deleted successfully", null)
    );
  } catch (error) {
    return next(createHttpError(500, "Internal server error deleting category"));
  }
};