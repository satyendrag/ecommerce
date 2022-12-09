import mongoose from "mongoose";

const orderShema = new mongoose.Schema(
  {
    product: {
      type: [
        {
          productId: {
            ref: "Product",
            type: mongoose.Types.ObjectId,
            required: True,
          },
          count: Number,
          price: Number,
        },
      ],
      required: true,
    },
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    coupon: String,
    transactionId: String,

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.ORDERED,
    },
  },
  { timestamps: true }
);

export default mongoose.Model("Order", orderShema);
