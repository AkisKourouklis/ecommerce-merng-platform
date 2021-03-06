import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import CategoryModel from '../category.model';

export const categoryAddProducts = async (_, { products, categoryId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    products.map(async (data) => {
      await CategoryModel.findByIdAndUpdate({ _id: categoryId }, { $push: { products: data._id } }, { new: true });
    });

    return 'Products added to category';
  } catch (err) {
    graphqlError(err);
  }
};
