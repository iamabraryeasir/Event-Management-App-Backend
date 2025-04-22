import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Category } from "../../models/category.model.js";
import { uploadToCloudinary } from "../../helpers/cloudinary.js";

export const createCategoryService = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name?.trim()) {
      return next(createHttpError(400, "Category name is required"));
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return next(createHttpError(400, "Category already exists"));
    }

    // Create category data object
    const categoryData = {
      name: name.trim(),
      description: description?.trim(),
    };

    // Handle icon upload if provided
    if (req.file) {
      const icon = await uploadToCloudinary(req.file.path, "category-icons");
      if (icon?.secure_url) {
        categoryData.icon = icon.secure_url;
      }
    }

    // Create the category
    const category = await Category.create(categoryData);

    return res
      .status(201)
      .json(new ApiResponse(201, "Category created successfully", category));
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error creating category")
    );
  }
};
