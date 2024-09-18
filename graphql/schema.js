import { mergeTypeDefs } from "@graphql-tools/merge";

/* import typeDef functions */
import { userTypeDefs } from "../typeDefs/user.typeDefs.js";
import { hotelTypeDefs } from "../typeDefs/hotel.typeDefs.js";

export const typeDefs = mergeTypeDefs([
  /* Add different typeDefs here */
  userTypeDefs,
  hotelTypeDefs
]);

// export const typeDefs = `#graphql
//   type Query {
//     hello: String
//     goodbye: String
//   }
// `;