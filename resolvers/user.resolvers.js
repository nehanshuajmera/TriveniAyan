export const userResolvers = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id);
    },
    users: async (_, __, { dataSources }) => {
      return dataSources.userAPI.getUsers();
    },
  },
  Mutation: {
    loginUser: async (_, { input }, { dataSources }) => {
      return dataSources.userAPI.loginUser(input);
    },
    registerUser: async (_, { input }, { dataSources }) => {
      return dataSources.userAPI.registerUser(input);
    },
    updateUser: async (_, { id, user }, { dataSources }) => {
      return dataSources.userAPI.updateUser(id, user);
    },
    updateUserAddress: async (_, { id, address }, { dataSources }) => {
      return dataSources.userAPI.updateUserAddress(id, address);
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.deleteUser(id);
    },
  },
};