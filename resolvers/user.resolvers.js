import {
  allUsers,
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  updateUserAddress,
  userById,
} from "../controllers/user.controller.js";

export const userResolvers = {
  Query: {
    users: allUsers,
    user: userById,
  },
  Mutation: {
    registerUser: registerUser,
    loginUser: loginUser,
    updateUser: updateUser,
    updateUserAddress: updateUserAddress,
    deleteUser: deleteUser,
  },
};
