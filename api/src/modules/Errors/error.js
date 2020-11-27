import { ApolloError } from 'apollo-server';
import Error from './error.model';

export const graphqlError = (error) => {
  try {
    const newError = new Error({ error });
    newError.save();
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
