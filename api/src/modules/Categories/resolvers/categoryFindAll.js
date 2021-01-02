import CategoryModel from '../category.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const categoryFindAll = async (_, { search = null, page = 1, limit = 20 }, context) => {
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

    const categories = await CategoryModel.find(searchQuery)
      .populate(['images', 'tags', 'variants'])
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await CategoryModel.countDocuments(searchQuery);

    return {
      categories,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    graphqlError(error);
  }
};
