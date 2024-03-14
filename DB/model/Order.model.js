import mongoose, { Schema, model, Types } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: [true, "productId must be required"],
        },
        quantity: {
          type: Number,
          required: [true, "quantity must be required"],
          min: 1,
        },
        name: {
          type: String,
          required: [true, "name must be required"],
        },
        //totalprice after discount
        unitPrice: {
          type: Number,
          required: [true, " unitPrice must be required"],
          min: 1,
        },
        //price of all quantity
        finalPrice: {
          type: Number,
          required: [true, " finalPrice must be required"],
          min: 1,
        },
      },
    ],
    note: String,
    reason: String,
    address: {
      type: String,
      required: [true, " address must be required"],
    },
    phone: [
      {
        type: String,
        required: [true, "phone must be required"],
      },
    ],
    paymentType: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    couponId: {
      type: Types.ObjectId,
      ref: "Coupon",
    },
    subPrice: {
      type: Number,
      required: [true, " subPrice must be required"],
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: [true, " totalPrice must be required"],
      min: 1,
    },
    status: {
      type: String,
      enum: [
        "Placed",
        "WaitForpayment",
        "Canceld",
        "Onway",
        "Rejected",
        "Deliverd",
      ],
      default: "Placed",
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "user must be required"],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//mongoose.model.Order ||
const orderModel = mongoose.model.Order || model("Order", orderSchema);
export default orderModel;
