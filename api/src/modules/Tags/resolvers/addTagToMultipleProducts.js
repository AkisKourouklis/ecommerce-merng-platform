import ProductModel from '../../Products/products.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const addTagToMultipleProducts = async (_, { tagId, products }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const updatedProducts = await products.map(async (data) => {
      const product = await ProductModel.findByIdAndUpdate(
        { _id: data._id },
        { $push: { tags: tagId } },
        { new: true }
      );
      return product;
    });
    return updatedProducts;
  } catch (error) {
    return graphqlError(error);
  }
};
