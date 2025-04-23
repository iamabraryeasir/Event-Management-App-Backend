import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Banner } from "../../models/banner.model.js";
import { Category } from "../../models/category.model.js";
import { Event } from "../../models/event.model.js";
import mongoose from "mongoose";

export const getLandingPageDataService = async (req, res, next) => {
  try {
    // Get banners (limit to 5)
    const banners = await Banner.find().sort({ createdAt: -1 }).limit(5);

    // Get upcoming events (events with date >= today, limit to 6)
    const today = req.query.today ? new Date(req.query.today) : new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = await Event.aggregate([
      { $match: { date: { $gte: today } } },
      { $sort: { date: 1 } },
      { $limit: 4 },
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
          _id: 1,
          name: 1,
          description: 1,
          date: 1,
          location: 1,
          banner: 1,
          "categoryInfo._id": 1,
          "categoryInfo.name": 1,
          "categoryInfo.icon": 1,
        },
      },
    ]);

    // Get categories (limit to 10)
    const categories = await Category.find().sort({ name: 1 }).limit(10);

    // featured events
    const featuredEvents = await Event.aggregate([
      { $sort: { date: 1 } },
      { $skip: 2 },
      { $limit: 3 },
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
          _id: 1,
          name: 1,
          description: 1,
          date: 1,
          location: 1,
          banner: 1,
          "categoryInfo._id": 1,
          "categoryInfo.name": 1,
          "categoryInfo.icon": 1,
        },
      },
    ]);

    // Return all data
    return res.status(200).json(
      new ApiResponse(200, "Landing page data retrieved successfully", {
        banners,
        upcomingEvents,
        categories,
        featuredEvents,
      })
    );
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting data"));
  }
};
