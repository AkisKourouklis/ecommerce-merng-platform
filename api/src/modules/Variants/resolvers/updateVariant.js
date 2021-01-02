import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import VariantModel from '../variants.model';

export const updateVariant = async (_, { variantInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { color, size, price, quantity, sku, barcode, images, material, variantId } = variantInput;

    const updateQuery = {};

    if (color) {
      updateQuery.color = color;
    }
    if (size) {
      updateQuery.size = size;
    }
    if (size) {
      updateQuery.material = material;
    }
    if (price) {
      updateQuery.price = price;
    }
    if (quantity) {
      updateQuery.quantity = quantity;
    }
    if (sku) {
      updateQuery.sku = sku;
    }
    if (barcode) {
      updateQuery.barcode = barcode;
    }
    if (images) {
      updateQuery.images = images;
    }

    const updatedVariant = await VariantModel.findByIdAndUpdate({ _id: variantId }, updateQuery, { new: true });
    return updatedVariant;
  } catch (error) {
    return graphqlError(error);
  }
};
