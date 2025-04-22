import createHttpError from "http-errors";

// services
import { signupUserService } from "../services/auth/signupUser.js";
import { loginUserService } from "../services/auth/loginUser.js";
import { logoutUserService } from "../services/auth/logoutUser.js";
import { getUserService } from "../services/auth/getUser.js";

const signupUser = async (req, res, next) => {
  try {
    signupUserService(req, res, next);
  } catch (err) {
    return next(createHttpError(500, "Internal server error during signup"));
  }
};

const loginUser = async (req, res, next) => {
  try {
    loginUserService(req, res, next);
  } catch (err) {
    return next(createHttpError(500, "Internal server error during login"));
  }
};

const logoutUser = async (req, res) => {
  try {
    logoutUserService(req, res);
  } catch (err) {
    return next(createHttpError(500, "Internal server error during logout"));
  }
};

const getUser = async (req, res, next) => {
  try {
    getUserService(req, res, next);
  } catch (err) {
    return next(createHttpError(500, "Internal server error getting user"));
  }
};

export { signupUser, loginUser, logoutUser, getUser };
