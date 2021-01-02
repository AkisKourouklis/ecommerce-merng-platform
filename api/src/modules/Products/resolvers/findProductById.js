import ProductModel from '../products.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const findProductById = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const product = await ProductModel.findById({ _id }).populate(['variants', 'images']);

    return product;
  } catch (error) {
    graphqlError(error);
  }
};
