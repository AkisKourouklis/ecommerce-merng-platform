import OrderModel from '../checkout.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const orderUpdate = async (_, { data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { uuid, products, customer, _id } = data;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      { _id },
      {
        uuid,
        customer,
        products
      },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    graphqlError(error);
  }
};
