import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import VariantModel from '../variants.model';

export const findAllVariants = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [{ sku: { $regex: search, $options: 'i' } }]
      };
    }

    const variants = await VariantModel.find(searchQuery)
      .populate('images')
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await VariantModel.countDocuments(searchQuery);

    return {
      variants,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    return graphqlError(error);
  }
};
