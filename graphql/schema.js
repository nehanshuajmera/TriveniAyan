import { mergeTypeDefs } from "@graphql-tools/merge";

/* import typeDef functions */
import { userTypeDefs } from "../typeDefs/user.typeDefs.js";

export const typeDefs = mergeTypeDefs([
  /* Add different typeDefs here */
  userTypeDefs,
]);

// export const typeDefs = `#graphql
//   type Query {
//     hello: String
//     goodbye: String
//   }
// `;