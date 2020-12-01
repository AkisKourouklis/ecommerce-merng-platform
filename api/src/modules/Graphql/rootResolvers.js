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
import { findAllVariants, createVariant, updateVariant } from '../Variants/variants.resolvers';
import {
  findAllTags,
  createTag,
  removeTagFromProduct,
  editTagFromProduct,
  addTagToProduct
} from '../Tags/tags.resolvers';
import {
  findAllTaxClasses,
  createTaxClass,
  removeTaxClassFromProduct,
  editTaxClass,
  addTaxClassToProduct
} from '../TaxClasses/taxClasses.resolvers';

export default {
  Query: {
    hello: () => 'Welcome to the ecommmerce-graphql-api',
    // Users
    findAllUsers,
    findUserByEmail,
    // Images
    findAllImages,

    //Variants
    findAllVariants,

    //Tags
    findAllTags,

    //TaxClasses
    findAllTaxClasses
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

    //Tags
    createTag,
    removeTagFromProduct,
    editTagFromProduct,
    addTagToProduct,

    //TaxClasses
    createTaxClass,
    removeTaxClassFromProduct,
    editTaxClass,
    addTaxClassToProduct
  }
};
