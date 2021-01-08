import CategoryModel from '../category.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const categoryFindById = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const category = await CategoryModel.findById({ _id }).populate(['products', 'images']);

    return category;
  } catch (error) {
    graphqlError(error);
  }
};
