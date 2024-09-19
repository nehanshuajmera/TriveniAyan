import {
  allHotels,
  createHotel,
  deleteHotel,
  hotelById,
  hotelRooms,
  updateAddress,
  updateHotel,
} from "../controllers/hotel.controller.js";

export const hotelResolvers = {
  Query: {
    hotels: allHotels,
    hotel: hotelById,
  },
  Mutation: {
    createHotel: createHotel,
    updateHotel: updateHotel,
    deleteHotel: deleteHotel,
    updateAddress: updateAddress,
  },
  Hotel: {
    rooms: hotelRooms,
  }
};
