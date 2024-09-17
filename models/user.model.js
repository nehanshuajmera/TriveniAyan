import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const schema = mongoose.Schema;

const userSchema = new schema({
  id: {
    type: String,
    required: true,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  address: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
    required: true,
    trim: true,
  },
  booking: [
    {
      type: schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  payment: [
    {
      type: schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  review: [
    {
      type: schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);