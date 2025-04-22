import createHttpError from "http-errors";
import { createCategoryService } from "../services/category/createCategory.js";
import { getCategoriesService } from "../services/category/getCategories.js";
import { getCategoryService } from "../services/category/getCategory.js";
import { updateCategoryService } from "../services/category/updateCategory.js";
import { deleteCategoryService } from "../services/category/deleteCategory.js";

export const createCategory = async (req, res, next) => {
  try {
    createCategoryService(req, res, next);
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error creating category")
    );
  }
};

export const getCategories = async (req, res, next) => {
  try {
    getCategoriesService(req, res, next);
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error getting categories")
    );
  }
};

export const getCategory = async (req, res, next) => {
  try {
    getCategoryService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting category"));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    updateCategoryService(req, res, next);
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error updating category")
    );
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    deleteCategoryService(req, res, next);
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error deleting category")
    );
  }
};
