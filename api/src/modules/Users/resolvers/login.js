import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import jwtAuthentication from '../../../middleware/auth.middleware';
import UserModel from '../users.model';

export const login = async (_, { email, password }) => {
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return new ApolloError('User not exists');
  }
  const isEqual = await bcrypt.compare(password, foundUser.password);
  if (foundUser) {
    if (!isEqual) {
      return new ApolloError("Passwords don't match");
    }
    const jwtUserData = {
      email: foundUser.email,
      id: foundUser._id,
      fullname: foundUser.fullname,
      role: foundUser.role,
      lastActive: foundUser.lastActive
    };
    const token = await jwtAuthentication.createUserSign(jwtUserData);
    if (foundUser) {
      const user = {
        token
      };
      return user;
    }
  }
};
