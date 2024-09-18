export const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
    role: String
    address: Address!
    # bookings: [Booking!]
    # payment: [Payment!]
    # notifications: [Notification!]
    # reviews: [Review!]
    # resetPasswordToken: String
    # resetPasswordTokenExpiry: String
    createdAt: String!
    updatedAt: String!
  }

  type Address {
    street: String!
    city: String!
    country: String!
    postalCode: String!
  }

  type AuthPayload {
    token: String!
    username: String!
  }

  type Query {
    user(id: ID!): User!
    users: [User!]
  }

  type Mutation {
    loginUser(input: LoginInput!): AuthPayload!
    registerUser(input: RegisterInput!): AuthPayload!
    updateUser(
      id: ID!
      user: UpdateUserInput!
    ): User!
    updateUserAddress(
      id: ID!
      address: UpdateAddressInput!
    ): User!
    deleteUser(id: ID!): User!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  input RegisterInput {
    name: String!
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
    role: String
  }

  input AddressInput {
    street: String!
    city: String!
    country: String!
    postalCode: String!
  }

  input UpdateUserInput {
    name: String
    username: String
    email: String
    password: String
    phoneNumber: String
    role: String
    address: AddressInput!
  }

  input UpdateAddressInput {
    street: String
    city: String
    country: String
    postalCode: String
  }
`;
