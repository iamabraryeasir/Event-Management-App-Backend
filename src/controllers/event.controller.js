import createHttpError from "http-errors";

// services
import { createEventService } from "../services/event/createEvent.js";
import { getEventService } from "../services/event/getEvent.js";
import { getEventsService } from "../services/event/getEvents.js";
import { updateEventService } from "../services/event/updateEvent.js";
import { deleteEventService } from "../services/event/deleteEvent.js";

const createEvent = async (req, res, next) => {
  try {
    createEventService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error creating event"));
  }
};

const getEvent = async (req, res, next) => {
  try {
    getEventService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting event"));
  }
};

const getEvents = async (req, res, next) => {
  try {
    getEventsService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting events"));
  }
};

const updateEvent = async (req, res, next) => {
  try {
    updateEventService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error updating event"));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    deleteEventService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error deleting event"));
  }
};

export { createEvent, getEvent, getEvents, updateEvent, deleteEvent };
