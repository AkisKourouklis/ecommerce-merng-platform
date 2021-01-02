import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import CartModel from '../cart.model';

export const cartRemoveProducts = async (_, { _id, data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    data.map(async (product) => {
      await CartModel.findByIdAndUpdate({ _id }, { $pull: { products: { _id: product._id } } }, { new: true });
    });

    return 'Products removed from category';
  } catch (err) {
    graphqlError(err);
  }
};
