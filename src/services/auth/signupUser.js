import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { User } from "../../models/user.model.js";

export const signupUserService = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // validate user input
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return next(createHttpError(400, "All fields are required"));
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(createHttpError(400, "User already exists"));
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const responseData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", responseData));
  } catch (err) {
    return next(createHttpError(500, "Internal server error during signup"));
  }
};
