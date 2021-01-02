import { ApolloError } from 'apollo-server';
import jwtAuthentication from '../../../middleware/auth.middleware';

export const checkToken = async (_, { token }) => {
  try {
    const response = await jwtAuthentication.checkToken(token);
    return response;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
