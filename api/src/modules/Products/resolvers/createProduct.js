import ProductModel from '../products.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { ApolloError } from 'apollo-server';

export const createProduct = async (_, { productInput }, context) => {
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

    const newProduct = new ProductModel({
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
    });

    await newProduct.save();

    return newProduct;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
