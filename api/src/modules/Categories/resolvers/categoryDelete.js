import CategoryModel from '../category.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const categoryDelete = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const deletedProduct = await CategoryModel.findByIdAndRemove({ _id }).populate(['products', 'images', 'tags']);
    return deletedProduct;
  } catch (error) {
    graphqlError(error);
  }
};
