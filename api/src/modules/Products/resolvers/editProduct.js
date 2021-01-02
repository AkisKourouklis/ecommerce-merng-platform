import ProductModel from '../products.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const editProduct = async (_, { productInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const {
      name,
      description,
      sku,
      barcode,
      isActive,
      quantity,
      tax,
      images,
      variants,
      tags,
      price,
      seo,
      vendor
    } = productInput;

    const insertImages = images?.map((i) => i._id);
    const insertTags = tags?.map((i) => i._id);
    const insertVariants = variants?.map((i) => i._id);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: productInput._id },
      {
        name,
        description,
        sku,
        barcode,
        isActive,
        quantity,
        tax,
        images: insertImages,
        variants: insertVariants,
        tags: insertTags,
        price,
        seo,
        vendor
      },
      { new: true }
    ).populate(['variants', 'images', 'tags']);
    return updatedProduct;
  } catch (error) {
    graphqlError(error);
  }
};
