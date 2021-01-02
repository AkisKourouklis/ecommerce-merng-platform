import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';
import User from '../users.model';

export const findUserByEmail = async (_, { email }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return graphqlError(error);
  }
};
