import { ApolloError } from 'apollo-server';
import ProductModel from '../../Products/products.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const addTagToProduct = async (_, { tagId, productId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  const exists = await ProductModel.findOne({ _id: productId, tags: { _id: tagId } });
  if (exists) {
    return new ApolloError('There was an error');
  }
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      { $push: { tags: tagId } },
      { new: true }
    );
    return updateProduct;
  } catch (error) {
    return graphqlError(error);
  }
};
