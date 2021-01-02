import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import CartModel from '../cart.model';

export const cartAddProducts = async (_, { _id, data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    data.map(async (product) => {
      await CartModel.findByIdAndUpdate({ _id }, { $push: { products: product } }, { new: true });
    });

    return 'Products added to category';
  } catch (err) {
    graphqlError(err);
  }
};
