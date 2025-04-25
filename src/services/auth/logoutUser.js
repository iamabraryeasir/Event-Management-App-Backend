import { ApiResponse } from "../../helpers/ApiResponse.js";

export const logoutUserService = async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "Logout successful", null));
};
