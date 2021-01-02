import CartModel from '../cart.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const cartEdit = async (_, { data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { uuid, products, _id } = data;

    const updatedCart = await CartModel.findByIdAndUpdate(
      { _id },
      {
        uuid,
        products
      },
      { new: true }
    );
    return updatedCart;
  } catch (error) {
    graphqlError(error);
  }
};
