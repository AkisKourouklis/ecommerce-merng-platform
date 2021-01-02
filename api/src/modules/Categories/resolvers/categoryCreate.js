import { ApolloError } from 'apollo-server';
import CategoryModel from '../category.model';
import jwtAuthentication from '../../../middleware/auth.middleware';

export const categoryCreate = async (_, { categoryInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { name, description, images, products, tags, seo } = categoryInput;

    const insertImages = images?.map((i) => i._id);
    const insertTags = tags?.map((i) => i._id);
    const insertProducts = products?.map((i) => i._id);

    const newProduct = new CategoryModel({
      name,
      description,
      images: insertImages,
      products: insertProducts,
      tags: insertTags,
      seo
    });

    await newProduct.save();

    return newProduct;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
