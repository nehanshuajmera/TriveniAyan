import mongoose from "mongoose";
const schema = mongoose.Schema;

const roomSchema = new schema(
  {
    hotelId: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "Hotel",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    roomType: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    amenities: [String],
    images: [String],
    availability: [
      {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
