export const bookingTypeDefs = `#graphql
  type Booking {
    id: ID!
    user: User!
    hotel: Hotel!
    flight: Flight!
    tour: Tour!
    bus: Bus!
    room: Room!
    bookingDate: String!
    bookingType: String!
    bookingStatus: String!
    totalAmount: Int!
    paymentStatus: String!
  }

  extend type Query {
    bookings: [Booking!]
    booking(id: ID!): Booking
  }

  extend type Mutation {
    createBooking(input: createBookingInput!): Booking
    updateBooking(id: ID!, input: updateBookingInput!): Booking
    deleteBooking(id: ID!): Booking
  }

  input createBookingInput {
    userId: ID!
    hotelId: ID
    flightId: ID
    tourId: ID
    busId: ID
    roomId: ID
    bookingDate: String!
    bookingType: String!
    bookingStatus: String!
    totalAmount: Int!
    paymentStatus: String!
  }

  input updateBookingInput {
    userId: ID
    hotelId: ID
    flightId: ID
    tourId: ID
    busId: ID
    roomId: ID
    bookingDate: String
    bookingType: String
    bookingStatus: String
    totalAmount: Int
    paymentStatus: String
    createdAt: String!
    updatedAt: String!
  }
`