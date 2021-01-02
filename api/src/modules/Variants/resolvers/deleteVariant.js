import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import ProductModel from '../../Products/products.model';
import VariantModel from '../variants.model';

export const deleteVariant = async (_, { variantId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const foundProduct = await ProductModel.find().populate('variants', null, { _id: variantId });
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: foundProduct[0]._id },
      { $pull: { variants: variantId } },
      { new: true }
    ).populate(['variants', 'tags', 'images', 'taxClass']);
    const removedVariant = await VariantModel.findByIdAndRemove({ _id: variantId }).populate('images');

    return { updatedProduct, removedVariant };
  } catch (error) {
    graphqlError(error);
  }
};
