import OrderModel from '../checkout.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const orderDelete = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const deletedOrder = await OrderModel.findByIdAndRemove({ _id });
    return deletedOrder;
  } catch (error) {
    graphqlError(error);
  }
};
