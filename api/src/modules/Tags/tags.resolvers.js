import TagModel from './tags.model';
import ProductModel from '../Products/products.model';
import jwtAuthentication from '../../middleware/auth.middleware';
import { graphqlError } from '../Errors/error';

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

export const createTag = async (_, { name }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const newTag = new TagModel({
      name
    });
    await newTag.save();
    return newTag;
  } catch (error) {
    return graphqlError(error);
  }
};

export const deleteTag = async (_, { tagId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const foundProduct = await ProductModel.find().populate('tags', null, { _id: tagId });
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: foundProduct[0]._id },
      { $pull: { tags: tagId } },
      { new: true }
    ).populate(['variants', 'tags', 'images', 'taxClass']);
    const removedTag = await TagModel.findByIdAndRemove({ _id: tagId }).populate('images');

    return { updatedProduct, removedTag };
  } catch (error) {
    graphqlError(error);
  }
};

export const addTagToProduct = async (_, { tagId, productId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  const exists = await ProductModel.findOne({ _id: productId, tags: { _id: tagId } });
  if (exists) {
    return new ApolloError('There was an error');
  } else {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        { _id: productId },
        { $push: { tags: tagId } },
        { new: true }
      );
      return updateProduct;
    } catch (error) {
      return graphqlError(error);
    }
  }
};

export const addTagToMultipleProducts = async (_, { tagId, products }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const updatedProducts = await products.map(async (data) => {
      const product = await ProductModel.findByIdAndUpdate(
        { _id: data._id },
        { $push: { tags: tagId } },
        { new: true }
      );
      return product;
    });
    return updatedProducts;
  } catch (error) {
    console.log(error);
  }
};

export const editTag = async (_, { _id, name }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const updateImage = await TagModel.findByIdAndUpdate({ _id }, { name }, { new: true });
    return updateImage;
  } catch (error) {
    console.log(error);
    // return graphqlError(error);
  }
};
