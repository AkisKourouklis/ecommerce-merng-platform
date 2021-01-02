import UserModel from '../users.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const findAllUsers = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [{ fullname: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }]
      };
    }

    const users = await UserModel.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await UserModel.countDocuments(searchQuery);

    return {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    return graphqlError(error);
  }
};
