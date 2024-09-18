import mongoose from "mongoose";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
const schema = mongoose.Schema;

const hotelSchema = new schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      immutable: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator: (v) => validator.isPostalCode(v, "any"),
          message: "Invalid Postal Code",
        },
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      amenities: [String],
      images: [String],
      bookings: [
        {
          type: schema.Types.ObjectId,
          ref: "Booking",
        },
      ],
      rooms: [
        {
          type: schema.Types.ObjectId,
          ref: "Room",
        },
      ],
    },
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("Hotel", hotelSchema);