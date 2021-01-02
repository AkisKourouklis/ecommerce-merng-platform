import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import ProductModel from '../../Products/products.model';
import VariantModel from '../variants.model';

export const createVariant = async (_, { variantInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { color, size, price, material, quantity, sku, barcode, images, productId } = variantInput;

    const duplicateVariant = await VariantModel.findOne({ sku });
    if (duplicateVariant) {
      graphqlError('Variant with that sku already exists');
    } else {
      const newVariant = new VariantModel({
        color,
        size,
        price,
        quantity,
        sku,
        barcode,
        images,
        material
      });
      await newVariant.save().then((data) => {
        if (productId) {
          ProductModel.findByIdAndUpdate({ _id: productId }, { $push: { variants: data._id } }, { new: true });
        }
      });
      return newVariant;
    }
  } catch (error) {
    return graphqlError(error);
  }
};
