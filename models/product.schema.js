import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      maxLenght: [120, "Product name should be less than 120 char"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price."],
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    collectionId: {
      ref: "Collection",
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.Model("productSchema", productSchema);
