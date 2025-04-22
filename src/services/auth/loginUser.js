import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";

export const loginUserService = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate user input
    if (!email?.trim() || !password?.trim()) {
      return next(createHttpError(400, "Email and password are required"));
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    // generate JWT token
    const token = jwt.sign({ id: user._id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    // set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.env === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    const responseData = {
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, "Login successful", responseData));
  } catch (err) {
    return next(createHttpError(500, "Internal server error during login"));
  }
};
