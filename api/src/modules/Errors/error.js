import jwtAuthentication from '../../middleware/auth.middleware';
import { ApolloError } from 'apollo-server';
import Error from './error.model';

export const graphqlError = async (error) => {
  try {
    const newError = new Error(error);
    newError.save();
    return newError;
  } catch {
    console.log(error);
  }

  return new ApolloError(`There was an error: ${error}`);
};

export const restApiError = (error) => {
  try {
    const newError = new Error({ error });
    newError.save();
  } catch {
    console.log(error);
  }
};

export const findAllErrors = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  let searchQuery = {};

  if (search) {
    searchQuery = {
      $or: [{ error: { $regex: search, $options: 'i' } }, { uuid: { $regex: search, $options: 'i' } }]
    };
  }

  const errors = await Error.find(searchQuery)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  const count = await Error.countDocuments(searchQuery);

  return {
    errors,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};
