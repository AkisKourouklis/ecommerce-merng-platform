import TagModel from '../tags.model';
import ProductModel from '../../Products/products.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const deleteTag = async (_, { tagId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const foundProduct = await ProductModel.find().populate('tags', null, { _id: tagId });
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: foundProduct[0]._id },
      { $pull: { tags: tagId } },
      { new: true }
    ).populate(['variants', 'tags', 'images', 'taxClass']);
    const removedTag = await TagModel.findByIdAndRemove({ _id: tagId }).populate('images');

    return { updatedProduct, removedTag };
  } catch (error) {
    graphqlError(error);
  }
};
