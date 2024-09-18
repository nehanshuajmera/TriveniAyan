import {
  allHotels,
  createHotel,
  deleteHotel,
  hotelById,
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
};
