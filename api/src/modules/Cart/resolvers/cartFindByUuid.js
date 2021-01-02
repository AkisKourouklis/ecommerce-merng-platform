import CartModel from '../cart.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const cartFindByUuid = async (_, { uuid }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const cart = await CartModel.findOne({ uuid });

    return cart;
  } catch (error) {
    graphqlError(error);
  }
};
