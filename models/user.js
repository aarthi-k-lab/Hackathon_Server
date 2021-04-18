import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  password: { type: String, required: true, min: 7 },
  role: {
    type: String,
    default: "client",
    enum: ["client", "admin"],
  },
  phone: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Phone is invalid");
      }
    },
  },
});

export const User = mongoose.model("User", userSchema);
