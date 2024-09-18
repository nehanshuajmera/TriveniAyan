export const roomTypeDefs = `#graphql
  type Room {
    id: ID!
    hotel: Hotel!
    description: String!
    roomType: String!
    price: Int!
    capacity: Int!
    amenities: [String!]!
    images: [String!]
    availability: [Availability!]
  }

  type Availability {
    date: String!
    isAvailable: Boolean!
  }

  extend type Query {
    rooms: [Room!]
    room(id: ID!): Room
  }

  extend type Mutation {
    createRoom(input: createRoomInput!): Room
    updateRoom(id: ID!, input: updateRoomInput!): Room
    deleteRoom(id: ID!): Room
  }

  input createRoomInput {
    hotel: ID!
    description: String!
    roomType: String!
    price: Int!
    capacity: Int!
    amenities: [String!]!
    images: [String!]
    availability: [AvailabilityInput!]
  }

  input AvailabilityInput {
    date: String!
    isAvailable: Boolean!
  }

  input updateRoomInput {
    description: String
    roomType: String
    price: Int
    capacity: Int
    amenities: [String!]
    images: [String!]
    availability: [AvailabilityInput!]
  }
`