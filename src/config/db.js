import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(`${config.db.uri}/${config.db.name}`);
    console.log(`Successfully connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};
