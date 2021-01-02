import CartModel from '../cart.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const cartFindAll = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } },
          { barcode: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const carts = await CartModel.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await CartModel.countDocuments(searchQuery);

    return {
      carts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    graphqlError(error);
  }
};
