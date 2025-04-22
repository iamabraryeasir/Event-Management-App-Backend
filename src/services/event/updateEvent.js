import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Event } from "../../models/event.model.js";
import { User } from "../../models/user.model.js";
import { uploadToCloudinary } from "../../helpers/cloudinary.js";

export const updateEventService = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(createHttpError(401, "Unauthorized - Login required"));
    }

    const { id } = req.params;
    if (!id) {
      return next(createHttpError(400, "Event ID is required"));
    }

    const { name, description, date, location } = req.body;
    if (!name?.trim() || !description?.trim() || !date || !location?.trim()) {
      return next(createHttpError(400, "All fields are required"));
    }

    // Check if the event exists
    const event = await Event.findById(id);
    if (!event) {
      return next(createHttpError(404, "Event not found"));
    }

    // Check if the user is authorized to update the event
    if (event.user.toString() !== user.id) {
      return next(
        createHttpError(403, "You are not authorized to update this event")
      );
    }

    // Prepare update object
    const updateData = {
      name,
      description,
      date,
      location,
    };

    // Handle banner image update if a new file is uploaded
    if (req.file) {
      const banner = await uploadToCloudinary(req.file.path, "event-banners");
      if (banner?.secure_url) {
        updateData.banner = banner.secure_url;
      }
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return next(createHttpError(404, "Event not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Event updated successfully", updatedEvent));
  } catch (error) {
    return next(createHttpError(500, "Internal server error updating event"));
  }
};
