import ProductModel from '../products.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const removeProduct = async (_, { productInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { _id } = productInput;
    const deletedProduct = await ProductModel.findByIdAndRemove({ _id }).populate(['variants', 'images', 'tags']);
    return deletedProduct;
  } catch (error) {
    graphqlError(error);
  }
};
