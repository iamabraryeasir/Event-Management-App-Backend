import { Router } from "express";
import { getLandingPageData } from "../controllers/public.controller.js";

const router = Router();

router.get("/", getLandingPageData);

export default router;
