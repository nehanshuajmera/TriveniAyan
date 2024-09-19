export const roomTypeDefs = `#graphql
  type Room {
    id: ID!
    description: String!
    roomType: String!
    price: Int!
    capacity: Int!
    amenities: [String!]!
    images: [String!]
    availability: [Availability!]!
    hotel: Hotel!
    createdAt: String!
    updatedAt: String!
  }

  type Availability {
    startDate: String!
    endDate: String!
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
    hotelId: ID!
    description: String!
    roomType: String!
    price: Int!
    capacity: Int!
    amenities: [String!]!
    images: [String!]!
    availability: [AvailabilityInput!]!
  }

  input AvailabilityInput {
    startDate: String!
    endDate: String!
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
`;
