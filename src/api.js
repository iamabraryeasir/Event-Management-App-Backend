import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import publicRoutes from "./routes/public.routes.js";

const api = Router();

api.use("/", publicRoutes);
api.use("/auth", authRoutes);
api.use("/events", eventRoutes);
api.use("/categories", categoryRoutes);
api.use("/banners", bannerRoutes);

export { api };
