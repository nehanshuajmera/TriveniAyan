import mongoose from "mongoose";
const schema = mongoose.Schema;

const roomBookingSchema = new schema(
  {
    roomId: {
      type: schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: schema.Types.ObjectId,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["PENDING", "PAID"],
    },
  },
  { timestamps: true }
);

export const RoomBooking = mongoose.model("RoomBooking", roomBookingSchema);
