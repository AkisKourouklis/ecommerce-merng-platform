import jwtAuthentication from '../../../middleware/auth.middleware';
import UserModel from '../users.model';
import { graphqlError } from '../../Errors/error';

export const deleteUser = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const foundUser = await UserModel.findByIdAndDelete({ _id });
    return foundUser;
  } catch (error) {
    return graphqlError(error);
  }
};
