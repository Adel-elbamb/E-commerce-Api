import mongoose,{ Schema,model ,Types} from "mongoose";

const cartSchema = new Schema(
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
          min:1
        },
      },
    ],
    userId: {
      type: Types.ObjectId,
      ref: "User",
      unique:true,
      required: [true, "user must be required"],
    },
  },
  {
    timestamps: true,
  }
);

//mongoose.model.Cart ||
const cartModel = mongoose.model.Cart || model("Cart", cartSchema);
export default cartModel