import mongoose from "mongoose";
import { Room } from "../models/room.model.js";
import { Hotel } from "../models/hotel.model.js";
import { formatDateTime } from "../utils/formatDateTime.js";

/* ------------ Query resolvers ------------ */
// Fetch all rooms
export const allRooms = async () => {
  try {
    const rooms = await Room.find({});
    return rooms.map((room) => ({
      id: room._id,
      hotelId: room.hotelId,
      description: room.description,
      roomType: room.roomType,
      price: room.price,
      capacity: room.capacity,
      amenities: room.amenities,
      images: room.images,
      availability: room.availability.map((availability) => ({
        startDate: formatDateTime(availability.startDate),
        endDate: formatDateTime(availability.endDate),
        isAvailable: availability.isAvailable,
      })),
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    }));
  } catch (err) {
    throw new Error(`Error fetching rooms: ${err.message}`);
  }
};

// Fetch a single room
export const singleRoom = async (_, { id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid room ID");
    }

    const room = await Room.findById(id);

    if (!room) {
      throw new Error("Room not found");
    }
    return {
      id: room._id,
      hotelId: room.hotelId,
      description: room.description,
      roomType: room.roomType,
      price: room.price,
      capacity: room.capacity,
      amenities: room.amenities,
      images: room.images,
      availability: room.availability.map((availability) => ({
        startDate: formatDateTime(availability.startDate),
        endDate: formatDateTime(availability.endDate),
        isAvailable: availability.isAvailable,
      })),
      createdAt: formatDateTime(room.createdAt),
      updatedAt: formatDateTime(room.updatedAt),
    };
  } catch (err) {
    throw new Error(`Error fetching room: ${err.message}`);
  }
};

/* ------------ Mutation resolvers ------------ */
// Create a new room
export const createRoom = async (_, { input }) => {
  try {
    const {
      hotelId,
      description,
      roomType,
      price,
      capacity,
      amenities,
      images,
      availability,
    } = input;
    const newRoom = await Room.create({
      hotelId,
      description,
      roomType,
      price,
      capacity,
      amenities,
      images,
      availability,
    });
    return newRoom;
  } catch (err) {
    throw new Error(`Error creating room: ${err.message}`);
  }
};

// Update a room
export const updateRoom = async (_, { id, input }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid room ID");
    }
    const {
      description,
      roomType,
      price,
      capacity,
      amenities,
      images,
      availability,
    } = input;
    const room = await Room.findById(id);

    if (!room) {
      throw new Error("Room not found");
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        description: description || room.description,
        roomType: roomType || room.roomType,
        price: price || room.price,
        capacity: capacity || room.capacity,
        amenities: amenities || room.amenities,
        images: images || room.images,
        availability: availability || room.availability,
      },
      { new: true }
    );
    return updatedRoom;
  } catch (err) {
    throw new Error(`Error updating room: ${err.message}`);
  }
};

// Delete a room
export const deleteRoom = async (_, { id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid room ID");
    }
    const room = await Room.findById(id);

    if (!room) {
      throw new Error("Room not found");
    }

    await Room.findByIdAndDelete(id);
    return room;
  } catch (err) {
    throw new Error(`Error deleting room: ${err.message}`);
  }
};

/* ------------ related resolver ------------ */
// Fetch the hotel that a room belongs to
export const roomHotel = async (parent) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(parent.hotelId)) {
      throw new Error("Invalid hotel ID");
    }
    const hotel = await Hotel.findById(parent.hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  } catch (err) {
    throw new Error(`Error fetching hotel: ${err.message}`);
  }
};
