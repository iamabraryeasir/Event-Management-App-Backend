import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Event } from "../../models/event.model.js";
import mongoose from "mongoose";

export const getEventsService = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter parameters
    const { category, location } = req.query;
    
    // Build match stage for filtering
    const matchStage = {};
    if (category) matchStage.category = new mongoose.Types.ObjectId(category);
    if (location) matchStage.location = { $regex: location, $options: 'i' };
    
    // Get total count for pagination metadata with filters
    const totalEvents = await Event.countDocuments(matchStage);
    const totalPages = Math.ceil(totalEvents / limit);

    // Build aggregation pipeline with filters
    const pipeline = [];
    
    // Add match stage if filters exist
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }
    
    // Add rest of pipeline
    pipeline.push(
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
      { $skip: skip },
      { $limit: limit }
    );

    // Execute aggregation
    const events = await Event.aggregate(pipeline);

    // Create pagination metadata
    const pagination = {
      totalEvents,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return res.status(200).json(
      new ApiResponse(200, "Events retrieved successfully", {
        events,
        pagination,
      })
    );
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting events"));
  }
};
