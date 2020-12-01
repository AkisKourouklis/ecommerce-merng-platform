import { ApolloError } from 'apollo-server';
import Error from './error.model';

export const graphqlError = async (_, { error }, context) => {
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
