import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import jwtAuthentication from '../../../middleware/auth.middleware';
import UserModel from '../users.model';
import { graphqlError } from '../../Errors/error';

export const register = async (_, { userInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const { email, password, fullname, role } = userInput;
    const foundUser = await UserModel.find({ email });
    if (foundUser.length > 0 || role !== ('administrator' || 'user')) {
      return new ApolloError('User alrady exists | User role should be administrator or user');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({
      email,
      password: hashedPassword,
      fullname,
      role: role.toLowerCase()
    });
    await user.save();

    return user;
  } catch (error) {
    return graphqlError(error);
  }
};
