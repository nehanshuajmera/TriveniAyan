export const hotelTypeDefs = `#graphql
  type Hotel {
    id: ID!
    name: String!
    location: String!
    address: Address!
    description: String!
    rating: Int!
    amenities: [String!]!
    images: [String!]
    # bookings: [Booking]
    rooms: [Room!]
    createdAt: String!
    updatedAt: String!
  }

  type Address {
    street: String!
    city: String!
    state: String!
    country: String!
    postalCode: String!
  }

  extend type Query {
    hotels: [Hotel!]
    hotel(id: ID!): Hotel
  }

  extend type Mutation {
    createHotel(input: createHotelInput!): Hotel
    updateHotel(id: ID!, input: updateHotelInput!): Hotel
    deleteHotel(id: ID!): Hotel

    updateAddress(
      id: ID!, 
      address: updateAddressInput!
    ): Hotel
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    country: String!
    postalCode: String!
  }

  input createHotelInput {
    name: String!
    location: String!
    address: AddressInput!
    description: String!
    rating: Int!
    amenities: [String!]!
    images: [String!]!
  }

  input updateHotelInput {
    name: String
    location: String
    address: [AddressInput!]
    description: String
    rating: Int
    amenities: [String!]
    images: [String!]
  }

  input updateAddressInput {
    street: String
    city: String
    state: String
    country: String
    postalCode: String
  }
`;
