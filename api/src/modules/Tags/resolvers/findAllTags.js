import TagModel from '../tags.model';
import jwtAuthentication from '../../../middleware/auth.middleware';

export const findAllTags = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  let searchQuery = {};

  if (search) {
    searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { size: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { barcode: { $regex: search, $options: 'i' } }
      ]
    };
  }

  const tags = await TagModel.find(searchQuery)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  const count = await TagModel.countDocuments(searchQuery);

  return {
    tags,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};
