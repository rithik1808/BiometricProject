import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "",
    },
    biometric: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userScheme);
