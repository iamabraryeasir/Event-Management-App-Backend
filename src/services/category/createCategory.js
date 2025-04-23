import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Category } from "../../models/category.model.js";
import { uploadToCloudinary } from "../../helpers/cloudinary.js";
import fs from "fs";

export const createCategoryService = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return next(createHttpError(400, "Category name is required"));
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      fs.unlinkSync(req.file.path);
      return next(createHttpError(400, "Category already exists"));
    }

    const categoryData = {
      name: name.trim(),
    };

    if (!req.file) {
      return next(createHttpError(400, "Category icon is required"));
    }
    const icon = await uploadToCloudinary(req.file.path, "category-icons");
    if (!icon?.secure_url) {
      return next(createHttpError(500, "Failed to upload category icon"));
    }
    categoryData.icon = icon.secure_url;

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
