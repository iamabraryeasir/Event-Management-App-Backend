import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Category } from "../../models/category.model.js";
import { uploadToCloudinary } from "../../helpers/cloudinary.js";

export const updateCategoryService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return next(createHttpError(400, "Category ID is required"));
    }

    if (!name?.trim()) {
      return next(createHttpError(400, "Category name is required"));
    }

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return next(createHttpError(404, "Category not found"));
    }

    // Check if name already exists (excluding current category)
    const existingCategory = await Category.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (existingCategory) {
      return next(createHttpError(400, "Category name already exists"));
    }

    // Prepare update data
    const updateData = {
      name: name.trim(),
    };

    if (req.file) {
      const icon = await uploadToCloudinary(req.file.path, "category-icons");
      if (icon?.secure_url) {
        updateData.icon = icon.secure_url;
      }
    }

    // Update the category
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Category updated successfully", updatedCategory)
      );
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error updating category")
    );
  }
};
