import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import OrderModel from '../checkout.model';

export const orderAddProducts = async (_, { _id, data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    data.map(async (product) => {
      await OrderModel.findByIdAndUpdate({ _id }, { $push: { products: product } }, { new: true });
    });

    return 'Products added to order';
  } catch (err) {
    graphqlError(err);
  }
};
