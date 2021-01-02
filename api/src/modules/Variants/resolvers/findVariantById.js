import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import VariantModel from '../variants.model';

export const findVariantById = async (_, { variantId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const singleVariant = await VariantModel.findById({ _id: variantId }).populate('images');
    return singleVariant;
  } catch (error) {
    return graphqlError(error);
  }
};
