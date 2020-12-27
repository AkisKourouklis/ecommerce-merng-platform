import ProductModel from './products.model';
import jwtAuthentication from '../../middleware/auth.middleware';
import { graphqlError } from '../Errors/error';
import { ApolloError } from 'apollo-server';

export const findProductById = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const product = await ProductModel.findById({ _id }).populate(['variants', 'images']);

    return product;
  } catch (error) {
    graphqlError(error);
  }
};

export const findAllProducts = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } },
          { barcode: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const products = await ProductModel.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await ProductModel.countDocuments(searchQuery);

    return {
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    graphqlError(error);
  }
};

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

export const removeProduct = async (_, { productInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { _id } = productInput;
    const deletedProduct = await ProductModel.findByIdAndRemove({ _id }).populate(['variants', 'images', 'tags']);
    return deletedProduct;
  } catch (error) {
    graphqlError(error);
  }
};

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
      { _id: id },
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
