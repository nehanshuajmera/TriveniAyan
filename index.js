import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

config();

const PORT = process.env.PORT;
const app = express();

/* Cross Origin Resource Sharing Options */
const corsOptions = {
  origin: ["http://localhost:5173", "https://studio.apollographql.com"],
  credentials: true,
};

/* Middlewares */
app.use(express.json());
app.use(cors(corsOptions));

/* Initializing Apollo Server */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

/* Starting Apollo Server */
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
};

startApolloServer();

/* Initializing Database Connectivity */
const connect = async () => {
  try {
    await mongoose.connect(process.env.MDB_CONNECT);
    console.log(`Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
  }
};

connect();

/* Global Error Handling */
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err}`);
  process.exit(1);
});
