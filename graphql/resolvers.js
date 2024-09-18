import { mergeResolvers } from "@graphql-tools/merge";

/* import resolver functions */
import { userResolvers } from "../resolvers/user.resolvers.js";
import { hotelResolvers } from "../resolvers/hotel.resolvers.js";
import { roomResolvers } from "../resolvers/room.resolvers.js";

export const resolvers = mergeResolvers([
  /* Add different resolvers here */
  userResolvers,
  hotelResolvers,
  roomResolvers
]);

// export const resolvers = {
//   Query: {
//     hello: () => 'Hello, Apollo!',
//     goodbye: () => 'Goodbye, Apollo!',
//   },
// };
