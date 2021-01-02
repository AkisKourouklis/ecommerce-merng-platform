import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import VariantModel from '../variants.model';

export const removeImageFromVariant = async (_, { imageId, variantId }, context) => {
  try {
    await jwtAuthentication.verifyTokenMiddleware(context);

    const updatedVariant = await VariantModel.findByIdAndUpdate(
      { _id: variantId },
      { $pull: { images: imageId } },
      { new: true }
    );

    return updatedVariant;
  } catch (error) {
    graphqlError(error);
  }
};
