import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Event } from "../../models/event.model.js";
import { User } from "../../models/user.model.js";

export const getEventsService = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalEvents = await Event.countDocuments();
    const totalPages = Math.ceil(totalEvents / limit);

    // Add pagination to aggregation pipeline
    const events = await Event.aggregate([
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
        $project: {
          "createdBy._id": 1,
          "createdBy.name": 1,
          name: 1,
          description: 1,
          date: 1,
          location: 1,
          banner: 1,
          createdAt: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    // Create pagination metadata
    const pagination = {
      totalEvents,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, "Events retrieved successfully", { events, pagination }));
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting events"));
  }
};
