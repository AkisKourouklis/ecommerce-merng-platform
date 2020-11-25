import { findAllUsers, findUserByEmail, register, updateUser, deleteUser, login } from '../Users/users.resolvers';

export default {
  Query: {
    hello: () => 'Welcome to the ecommmerce-graphql-api',
    // Users
    findAllUsers,
    findUserByEmail
  },
  Mutation: {
    hello: () => 'Welcome to the ecommmerce-graphql-api',
    // Users
    register,
    updateUser,
    deleteUser,
    login
  }
};
