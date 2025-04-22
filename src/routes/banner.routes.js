import { Router } from "express";
import {
  createBanner,
  getBanners,
  getBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/banner.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getBanners);
router.get("/:id", getBanner);

// Admin-only routes
router.post("/", protectRoute, upload.single("image"), createBanner);
router.put("/:id", protectRoute, upload.single("image"), updateBanner);
router.delete("/:id", protectRoute, deleteBanner);

export default router;
