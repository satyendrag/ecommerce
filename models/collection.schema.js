import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
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

export default mongoose.model("Collection", collectionSchema);
