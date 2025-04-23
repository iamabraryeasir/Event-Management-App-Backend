import { Router } from "express";
import { getLandingPageData } from "../controllers/public.controller.js";

const router = Router();

router.get("/home-page", getLandingPageData);

export default router;
