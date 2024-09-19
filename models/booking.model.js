import mongoose from "mongoose";
const schema = mongoose.Schema;

const bookingSchema = new schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    hotelId: {
      type: String,
      ref: "Hotel",
    },
    flightId: {
      type: String,
      ref: "Flight",
    },
    tourId: {
      type: String,
      ref: "Tour",
    },
    carRentalId: {
      type: String,
      ref: "CarRental",
    },
    roomId: {
      type: String,
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
      enum: ["hotel", "tour", "carRental", "room", "flight"],
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
