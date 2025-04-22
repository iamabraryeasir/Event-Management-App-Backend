import createHttpError from "http-errors";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { User } from "../../models/user.model.js";

export const getUserService = async (req, res, next) => {
  try {
    const user = req.user;

    const userExists = await User.findById(user.id);

    const responseData = {
      id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, "Current Logged in User data", responseData));
  } catch (error) {
    return next(createHttpError(500, "Internal server error getting user"));
  }
};
