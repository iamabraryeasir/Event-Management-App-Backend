import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategory);

// Admin-only routes
router.post("/", protectRoute, upload.single("icon"), createCategory);
router.put("/:id", protectRoute, upload.single("icon"), updateCategory);
router.delete("/:id", protectRoute, deleteCategory);

export default router;
