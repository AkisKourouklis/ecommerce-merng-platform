import { findAllUsers, findUserByEmail, register, updateUser, deleteUser, login } from '../Users/users.resolvers';
import { findAllImages, removeImage, uploadImage } from '../Images/images.resolvers';

export default {
  Query: {
    hello: () => 'Welcome to the ecommmerce-graphql-api',
    // Users
    findAllUsers,
    findUserByEmail,
    // Images
    findAllImages
  },
  Mutation: {
    hello: () => 'Welcome to the ecommmerce-graphql-api',
    // Users
    register,
    updateUser,
    deleteUser,
    login,
    // Images
    removeImage,
    uploadImage
  }
};
