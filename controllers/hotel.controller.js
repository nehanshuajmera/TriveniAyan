import mongoose from "mongoose";
import { Hotel } from "../models/hotel.model.js";
import { Room } from "../models/room.model.js";

/* ------------ Hotel Query ------------ */
// Fetch all hotels
export const allHotels = async () => {
  try {
    const hotels = await Hotel.find({});
    return hotels;
  } catch (err) {
    throw new Error(`Error fetching hotels: ${err.message}`);
  }
};

// Fetch a hotel by ID
export const hotelById = async (_, { id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Hotel ID");
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  } catch (err) {
    throw new Error(`Error fetching hotel: ${err.message}`);
  }
};

/* ------------ Hotel Mutation ------------ */
// Create a new hotel
export const createHotel = async (_, { input }) => {
  try {
    const { name, location, address, description, rating, amenities, images } =
      input;
    const hotel = await Hotel.create({
      name,
      location,
      address,
      description,
      rating,
      amenities,
      images,
    });
    return hotel;
  } catch (err) {
    console.error(`Error creating hotel: ${err.message}`);
    throw new Error(`Error creating hotel: ${err.message}`);
  }
};

// Update a hotel
export const updateHotel = async (_, { id, input }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid hotel ID");
    }

    const { name, location, address, description, rating, amenities, images } =
      input;

    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        name,
        location,
        address,
        description,
        rating,
        amenities,
        images,
      },
      { new: true }
    );

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    return hotel;
  } catch (err) {
    throw new Error(`Error updating hotel: ${err.message}`);
  }
};

// Delete a hotel
export const deleteHotel = async (_, { id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid hotel ID");
    }

    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    return hotel;
  } catch (err) {
    throw new Error(`Error deleting hotel: ${err.message}`);
  }
};

// Update hotel address
export const updateAddress = async (_, { id, address }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Hotel ID");
    }

    const { street, city, state, country, postalCode } = address;
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { address: { street, city, state, country, postalCode } },
      { new: true }
    );

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    return hotel;
  } catch (err) {
    throw new Error(`Error updating hotel address: ${err.message}`);
  }
};

/* ------------ Related Resolver ------------ */
// Fetch rooms by hotelId
export const hotelRooms = async (parent) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(parent.id)) {
      throw new Error("Invalid hotel ID");
    }

    const rooms = await Room.find({ hotelId: parent.id });
    if (!rooms) {
      throw new Error("Rooms not found");
    }
    return rooms;
  } catch (err) {
    throw new Error(`Error fetching rooms: ${err.message}`);
  }
};
