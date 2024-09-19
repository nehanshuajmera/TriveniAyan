import mongoose from "mongoose";
const schema = mongoose.Schema;

const bookingSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hotelId: {
      type: schema.Types.ObjectId,
      ref: "Hotel",
    },
    flightId: {
      type: schema.Types.ObjectId,
      ref: "Flight",
    },
    tourId: {
      type: schema.Types.ObjectId,
      ref: "Tour",
    },
    busId: {
      type: schema.Types.ObjectId,
      ref: "Bus",
    },
    roomId: {
      type: schema.Types.ObjectId,
      ref: "Room",
    },
    bookingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    bookingType: {
      type: String,
      required: true,
      enum: ["hotel", "tour", "bus", "room", "flight"],
    },
    bookingStatus: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
