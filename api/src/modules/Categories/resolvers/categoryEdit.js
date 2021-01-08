import CategoryModel from '../category.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const categoryEdit = async (_, { categoryInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { name, description, images, products, tags, seo, _id } = categoryInput;

    const insertImages = images?.map((i) => i._id);
    const insertTags = tags?.map((i) => i._id);
    const insertProducts = products?.map((i) => i._id);

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      { _id },
      {
        name,
        description,
        images: insertImages,
        products: insertProducts,
        tags: insertTags,
        seo
      },
      { new: true }
    ).populate(['products', 'images', 'tags']);
    return updatedCategory;
  } catch (error) {
    graphqlError(error);
  }
};
