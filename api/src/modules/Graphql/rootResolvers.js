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
  deleteVariant
} from '../Variants/variants.resolvers';
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
import { graphqlError, findAllErrors } from '../Errors/error';
import { findAllProducts } from '../Products/products.resolvers';

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

    //TaxClasses
    findAllTaxClasses,

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

    //Tags
    createTag,
    removeTagFromProduct,
    editTagFromProduct,
    addTagToProduct,

    //TaxClasses
    createTaxClass,
    removeTaxClassFromProduct,
    editTaxClass,
    addTaxClassToProduct,

    //Errors
    graphqlError
  }
};
