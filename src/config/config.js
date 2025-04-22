import "dotenv/config";

export const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  db: {
    uri: process.env.MONGODB_URI,
    name: process.env.MONGODB_NAME,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
