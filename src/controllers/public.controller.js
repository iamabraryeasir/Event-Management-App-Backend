import createHttpError from "http-errors";
import { getLandingPageDataService } from "../services/public/getLandingPageData.js";

const getLandingPageData = async (req, res, next) => {
  try {
    getLandingPageDataService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting data"));
  }
};

export { getLandingPageData };
