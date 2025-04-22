import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const api = Router();

api.use("/auth", authRoutes);
api.use("/events", eventRoutes);
api.use("/categories", categoryRoutes);

export { api };
