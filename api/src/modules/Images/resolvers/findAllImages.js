import jwtAuthentication from '../../../middleware/auth.middleware';
import Image from '../images.model';

export const findAllImages = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  let searchQuery = {};

  if (search) {
    searchQuery = {
      $or: [{ alt: { $regex: search, $options: 'i' } }]
    };
  }

  const images = await Image.find(searchQuery)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  const count = await Image.countDocuments(searchQuery);

  return {
    images,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};
