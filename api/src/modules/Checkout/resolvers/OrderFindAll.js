import CheckoutModel from '../checkout.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const orderFindAll = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [
          { 'customer.firstname': { $regex: search, $options: 'i' } },
          { 'customer.lastname': { $regex: search, $options: 'i' } },
          { 'customer.email': { $regex: search, $options: 'i' } },
          { 'customer.address': { $regex: search, $options: 'i' } }
        ]
      };
    }

    const orders = await CheckoutModel.find(searchQuery)
      .populate(['images', 'tags'])
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await CheckoutModel.countDocuments(searchQuery);

    return {
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    graphqlError(error);
  }
};
