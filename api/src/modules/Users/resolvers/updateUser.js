import jwtAuthentication from '../../../middleware/auth.middleware';
import UserModel from '../users.model';
import { graphqlError } from '../../Errors/error';

export const updateUser = async (_, { userInput, _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const { email, fullname, lastActive, role } = userInput;

    const updateQuery = {};

    if (email) {
      updateQuery.email = email;
    }
    if (fullname) {
      updateQuery.fullname = fullname;
    }
    if (lastActive) {
      updateQuery.lastActive = lastActive;
    }
    if (role) {
      updateQuery.role = role;
    }

    const updatedUser = await UserModel.findByIdAndUpdate({ _id }, updateQuery, { new: true });
    return updatedUser;
  } catch (error) {
    return graphqlError(error);
  }
};
