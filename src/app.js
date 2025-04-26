import express from "express";
import { config } from "./config/config.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import expressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import xss from "xss-clean";
import morgan from "morgan";
import { api } from "./api.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

const app = express();

// Trust proxy - needed for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// logging in development mode
if (config.env === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// configuring cors
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

// limit requests from same API
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
);

// middlewares
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(expressMongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());

// serving static files
app.use(express.static("public"));

// setting base route
app.use("/api", api);

// global error handler
app.use(globalErrorHandler);

export default app;
