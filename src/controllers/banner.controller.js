import createHttpError from "http-errors";
import { createBannerService } from "../services/banner/createBanner.js";
import { getBannersService } from "../services/banner/getBanners.js";
import { getBannerService } from "../services/banner/getBanner.js";
import { updateBannerService } from "../services/banner/updateBanner.js";
import { deleteBannerService } from "../services/banner/deleteBanner.js";

export const createBanner = async (req, res, next) => {
  try {
    createBannerService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error creating banner"));
  }
};

export const getBanners = async (req, res, next) => {
  try {
    getBannersService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting banners"));
  }
};

export const getBanner = async (req, res, next) => {
  try {
    getBannerService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting banner"));
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    updateBannerService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error updating banner"));
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    deleteBannerService(req, res, next);
  } catch (error) {
    return next(createHttpError(500, "Internal server error deleting banner"));
  }
};
