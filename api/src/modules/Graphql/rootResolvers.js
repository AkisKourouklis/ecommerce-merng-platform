import {
  findAllUsers,
  findUserByEmail,
  register,
  updateUser,
  deleteUser,
  login,
  checkToken
} from '../Users/users.resolvers';
import { findAllImages, removeImage, uploadImage } from '../Images/images.resolvers';
import {
  findAllVariants,
  createVariant,
  updateVariant,
  removeImageFromVariant,
  findVariantById,
  addImageToVariant,
  deleteVariant,
  createMultipleVariants
} from '../Variants/variants.resolvers';
import {
  findAllTags,
  createTag,
  deleteTag,
  editTag,
  addTagToProduct,
  addTagToMultipleProducts
} from '../Tags/tags.resolvers';
import { graphqlError, findAllErrors } from '../Errors/error';
import { findAllProducts, createProduct } from '../Products/products.resolvers';

export default {
  Query: {
    hello: () => 'Welcome to the ecommmerce-graphql-api',

    // Errors
    findAllErrors,

    // Users
    findAllUsers,
    findUserByEmail,
    // Images
    findAllImages,

    //Variants
    findAllVariants,
    findVariantById,

    //Tags
    findAllTags,

    //Products
    findAllProducts
  },
  Mutation: {
    hello: () => 'Welcome to the ecommmerce-graphql-api',
    // Users
    register,
    updateUser,
    deleteUser,
    login,
    checkToken,

    // Images
    removeImage,
    uploadImage,

    // Variants
    createVariant,
    updateVariant,
    removeImageFromVariant,
    addImageToVariant,
    deleteVariant,
    createMultipleVariants,

    //Tags
    createTag,
    deleteTag,
    editTag,
    addTagToProduct,
    addTagToMultipleProducts,

    //Errors
    graphqlError,

    //Products
    createProduct
  }
};
