import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Event } from "../../models/event.model.js";
import { User } from "../../models/user.model.js";
import { uploadToCloudinary } from "../../helpers/cloudinary.js";
import { Category } from "../../models/category.model.js";

export const createEventService = async (req, res, next) => {
  try {
    const { name, description, date, location, category } = req.body;
    if (
      !name?.trim() ||
      !description?.trim() ||
      !date ||
      !location?.trim() ||
      !category
    ) {
      return next(createHttpError(400, "All fields are required"));
    }

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return next(createHttpError(400, "Invalid category"));
    }

    const user = req.user;
    if (!user) {
      return next(createHttpError(401, "Unauthorized - Login required"));
    }

    const userExists = await User.findById(user.id);
    if (!userExists) {
      return next(createHttpError(401, "Unauthorized - Login required"));
    }

    const banner = await uploadToCloudinary(req.file.path, "event-banners");

    const event = await Event.create({
      name,
      description,
      date,
      location,
      category,
      banner: banner?.secure_url,
      user: user.id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Event created successfully", event));
  } catch (error) {
    return next(createHttpError(500, error.message));
  }
};
