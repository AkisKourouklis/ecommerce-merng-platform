import TaxClass from './taxClasses.model';
import ProductModel from '../Products/products.model';
import jwtAuthentication from '../../middleware/auth.middleware';
import { ApolloError } from 'apollo-server';

export const findAllTaxClasses = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  let searchQuery = {};

  if (search) {
    searchQuery = {
      $or: [{ name: { $regex: search, $options: 'i' } }, { tax: { $regex: search, $options: 'i' } }]
    };
  }

  const receiptTypes = await TaxClassModel.find(searchQuery)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  const count = await TaxClassModel.countDocuments(searchQuery);

  return {
    receiptTypes,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};

export const createTaxClass = async (_, { taxClassInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { name, tax } = taxClassInput;

    const newTaxClass = new TaxClass({
      name,
      tax
    });

    await newTaxClassModel.save();

    return newTaxClass;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};

export const editTaxClass = async (_, { taxClassInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { name, tax, _id } = taxClassInput;

    const updatedTaxClass = await TaxClassModel.findByIdAndUpdate({ _id }, { name, tax }, { new: true });

    return updatedTaxClass;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};

export const deleteTaxClass = async (_, { taxClassId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const updatedTaxClass = await TaxClassModel.findByIdAndRemove({ _id: taxClassId });

    return updatedTaxClass;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};

export const removeTaxClassFromProduct = async (_, { taxClassInput, ProductInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const receiptTypeId = JSON.parse(JSON.stringify(taxClassInput.id));
    const productId = JSON.parse(JSON.stringify(ProductInput.id));
    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      { $pull: { taxClass: receiptTypeId } },
      { new: true }
    );
    return updateProduct;
  } catch (error) {
    console.log(error);
    return new ApolloError(`There was an error: ${error}`);
  }
};

export const addTaxClassToProduct = async (_, { taxClassInput, ProductInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  const exists = await ProductModel.findOne({ _id: ProductInput.id, receipts: { _id: taxClassInput.id } });
  if (exists) {
    return new ApolloError('Receipt already exists.');
  } else {
    try {
      const receiptTypeId = JSON.parse(JSON.stringify(taxClassInput.id));
      const productId = JSON.parse(JSON.stringify(ProductInput.id));
      const updateProduct = await ProductModel.findByIdAndUpdate(
        { _id: productId },
        { $push: { taxClass: receiptTypeId } },
        { new: true }
      );

      return updateProduct;
    } catch (error) {
      return new ApolloError(`There was an error: ${error}`);
    }
  }
};
