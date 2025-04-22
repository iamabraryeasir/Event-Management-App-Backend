import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Event } from "../../models/event.model.js";
import mongoose from "mongoose";

export const getEventService = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const [event] = await Event.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(eventId) } },
      { $project: { updatedAt: 0 } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      { $unwind: "$createdBy" },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $project: {
          "createdBy._id": 1,
          "createdBy.name": 1,
          "categoryInfo._id": 1,
          "categoryInfo.name": 1,
          "categoryInfo.icon": 1,
          name: 1,
          description: 1,
          date: 1,
          location: 1,
          banner: 1,
          createdAt: 1,
        },
      },
    ]);

    if (!event) {
      return next(createHttpError(404, "No event found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Event retrieved successfully", event));
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting event"));
  }
};
