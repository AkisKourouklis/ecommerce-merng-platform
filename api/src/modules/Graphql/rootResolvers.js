// users
import { findAllUsers } from '../Users/resolvers/findAllUsers';
import { findUserByEmail } from '../Users/resolvers/findUserByEmail';
import { register } from '../Users/resolvers/register';
import { updateUser } from '../Users/resolvers/updateUser';
import { deleteUser } from '../Users/resolvers/deleteUser';
import { login } from '../Users/resolvers/login';
import { checkToken } from '../Users/resolvers/checkToken';

// images
import { findAllImages } from '../Images/resolvers/findAllImages';
import { removeImage } from '../Images/resolvers/removeImage';
import { uploadImage } from '../Images/resolvers/uploadImage';

// variants
import { createVariant } from '../Variants/resolvers/createVariant';
import { findAllVariants } from '../Variants/resolvers/findAllVariant';
import { updateVariant } from '../Variants/resolvers/updateVariant';
import { removeImageFromVariant } from '../Variants/resolvers/removeImageFromVariant';
import { findVariantById } from '../Variants/resolvers/findVariantById';
import { addImageToVariant } from '../Variants/resolvers/addImageToVariant';
import { deleteVariant } from '../Variants/resolvers/deleteVariant';
import { createMultipleVariants } from '../Variants/resolvers/createMultipleVariants';

// tags
import { findAllTags } from '../Tags/resolvers/findAllTags';
import { createTag } from '../Tags/resolvers/createTag';
import { deleteTag } from '../Tags/resolvers/deleteTag';
import { editTag } from '../Tags/resolvers/editTag';
import { addTagToProduct } from '../Tags/resolvers/addTagToProduct';
import { addTagToMultipleProducts } from '../Tags/resolvers/addTagToMultipleProducts';

import { graphqlError, findAllErrors } from '../Errors/error';

// products
import { createProduct } from '../Products/resolvers/createProduct';
import { editProduct } from '../Products/resolvers/editProduct';
import { findAllProducts } from '../Products/resolvers/findAllProducts';
import { findProductById } from '../Products/resolvers/findProductById';
import { removeProduct } from '../Products/resolvers/removeProduct';

// categories
import { categoryCreate } from '../Categories/resolvers/categoryCreate';
import { categoryEdit } from '../Categories/resolvers/categoryEdit';
import { categoryFindAll } from '../Categories/resolvers/categoryFindAll';
import { categoryFindById } from '../Categories/resolvers/categoryFindById';
import { categoryDelete } from '../Categories/resolvers/categoryDelete';
import { categoryAddProducts } from '../Categories/resolvers/categoryAddProducts';

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

    // Variants
    findAllVariants,
    findVariantById,

    // Tags
    findAllTags,

    // Products
    findAllProducts,
    findProductById,

    // Categories
    categoryFindById,
    categoryFindAll
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

    // Tags
    createTag,
    deleteTag,
    editTag,
    addTagToProduct,
    addTagToMultipleProducts,

    // Errors
    graphqlError,

    // Products
    createProduct,
    editProduct,
    removeProduct,

    // Categories
    categoryCreate,
    categoryEdit,
    categoryDelete,
    categoryAddProducts
  }
};
