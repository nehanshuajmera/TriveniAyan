import {
  allRooms,
  createRoom,
  deleteRoom,
  singleRoom,
  updateRoom,
} from "../controllers/room.controller.js";

export const roomResolvers = {
  Query: {
    rooms: allRooms,
    room: singleRoom,
  },
  Mutation: {
    createRoom: createRoom,
    updateRoom: updateRoom,
    deleteRoom: deleteRoom,
  },
};
