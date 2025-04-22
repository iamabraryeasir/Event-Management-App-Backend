import { Router } from "express";

import {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEvent);

router.post("/", protectRoute, upload.single("banner"), createEvent);
router.put("/:id", protectRoute, updateEvent);
router.delete("/:id", protectRoute, deleteEvent);

export default router;
