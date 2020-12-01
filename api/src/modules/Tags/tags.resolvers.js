import TagModel from './tags.model';
import ProductModel from '../Products/products.model';
import jwtAuthentication from '../../middleware/auth.middleware';

export const findAllTags = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  let searchQuery = {};

  if (search) {
    searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { size: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { barcode: { $regex: search, $options: 'i' } }
      ]
    };
  }

  const tags = await TagModel.find(searchQuery)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  const count = await TagModel.countDocuments(searchQuery);

  return {
    tags,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};

export const createTag = async (_, { tagInfo }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { name } = JSON.parse(JSON.stringify(tagInfo));
    const newTag = new Tag({
      name
    });
    await newTagModel.save();
    return newTag;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};

export const removeTagFromProduct = async (_, { tagInfo, ProductInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const tagId = JSON.parse(JSON.stringify(tagInfo.id));
    const productId = JSON.parse(JSON.stringify(ProductInput.id));
    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      { $pull: { tags: tagId } },
      { new: true }
    );
    return updateProduct;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};

export const addTagToProduct = async (_, { tagInfo, ProductInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  const exists = await ProductModel.findOne({ _id: ProductInput.id, tags: { _id: tagInfo.id } });
  if (exists) {
    return new ApolloError('There was an error');
  } else {
    try {
      const tagId = JSON.parse(JSON.stringify(tagInfo.id));
      const productId = JSON.parse(JSON.stringify(ProductInput.id));
      const updateProduct = await ProductModel.findByIdAndUpdate(
        { _id: productId },
        { $push: { tags: tagId } },
        { new: true }
      );
      return updateProduct;
    } catch (error) {
      return new ApolloError(`There was an error: ${error}`);
    }
  }
};

export const editTagFromProduct = async (_, { tagInfo }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { id, name } = JSON.parse(JSON.stringify(tagInfo));
    const updateImage = await TagModel.findByIdAndUpdate({ _id: id }, { name }, { new: true });
    return updateImage;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
