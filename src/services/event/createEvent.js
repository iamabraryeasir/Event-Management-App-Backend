import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Event } from "../../models/event.model.js";
import { User } from "../../models/user.model.js";

export const createEventService = async (req, res, next) => {
  try {
    res.send("Create Event");
  } catch (error) {
    return next(createHttpError(500, "Internal server error creating event"));
  }
};
