import { graphqlError } from '../../Errors/error';
import jwtAuthentication from '../../../middleware/auth.middleware';
import ProductModel from '../../Products/products.model';
import VariantModel from '../variants.model';

export const createMultipleVariants = async (_, { variantInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const newVariants = await variantInput.map(async (data) => {
      const { color, size, price, material, quantity, sku, barcode, images, productId } = data;
      const duplicateVariant = await VariantModel.findOne({ sku });

      if (duplicateVariant) {
        return graphqlError('Variant with that sku already exists');
      }
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

      await newVariant.save().then((e) => {
        if (productId) {
          ProductModel.findByIdAndUpdate({ _id: productId }, { $push: { variants: e._id } }, { new: true });
        }
      });
      return newVariant;
    });

    return newVariants;
  } catch (error) {
    return graphqlError(error);
  }
};
