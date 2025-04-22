import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import createHttpError from "http-errors";

export const protectRoute = async (req, res, next) => {
  try {
    let token = null;
    const authHeader =
      req?.headers?.Authorization || req?.headers?.authorization;

    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return next(createHttpError(401, "Unauthorized - Login required"));
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret);

      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return next(createHttpError(401, "Token has expired"));
      }

      req.user = decoded;
      next();
    } catch (jwtError) {
      if (jwtError.name === "JsonWebTokenError") {
        return next(createHttpError(401, "Invalid token"));
      } else if (jwtError.name === "TokenExpiredError") {
        return next(createHttpError(401, "Token has expired"));
      }
      throw jwtError;
    }
  } catch (error) {
    return next(
      createHttpError(500, "Internal server error during authentication")
    );
  }
};
