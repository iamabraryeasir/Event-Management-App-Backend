import { Schema, model } from "mongoose";

const bannerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Banner = model("Banner", bannerSchema);
