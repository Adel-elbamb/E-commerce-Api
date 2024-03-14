import mongoose, { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName required"],
      min: [3, "minimum length 3 char"],
      max: [20, "max length 20 char"],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "lastName required"],
      min: [3, "minimum length 3 char"],
      max: [20, "max length 20 char"],
      lowercase: true,
    },
    userName: {
      type: String,
      unique: [true, "userNmae must be unique"],
    },
    email: {
      type: String,
      required: [true, "email must be required"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "password must be required"],
    },
    gender: {
      type: String,
      enum: ["female", "male"],
      default: "female",
    },
    mobileNumber: {
      type: String,
      unique: [true, "mobileNumber must be unique"],
      required: [true, "mobileNumber required"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    status: {
      type: String,
      default: "Offline",
      enum: ["Offline", "Online"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    address: String,
    image: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    DOB: String,
    code: String,
    wishList: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model.User || model("User", userSchema);

export default userModel;
