import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Collection name is required"],
      maxLenght: [120, "Collection name should be less than 120 char"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
