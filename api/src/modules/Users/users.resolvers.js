import UserModel from './users.model';
import bcrypt from 'bcryptjs';
import jwtAuthentication from '../../middleware/auth.middleware';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { graphqlError } from '../Errors/error';

export const findAllUsers = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [{ fullname: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }]
      };
    }

    const users = await UserModel.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await UserModel.countDocuments(searchQuery);

    return {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    return graphqlError(error);
  }
};

export const findUserByEmail = async (_, { email }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return graphqlError(error);
  }
};

export const register = async (_, { userInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const { email, password, fullname, role } = userInput;
    const foundUser = await UserModel.find({ email });
    if (foundUser.length > 0 || role !== ('administrator' || 'user')) {
      return new ApolloError('User alrady exists | User role should be administrator or user');
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({
        email,
        password: hashedPassword,
        fullname,
        role: role.toLowerCase()
      });
      await user.save();

      return user;
    }
  } catch (error) {
    return graphqlError(error);
  }
};

export const login = async (_, { email, password }) => {
  let loadedUser;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return new ApolloError('User not exists');
  }
  loadedUser = foundUser;
  const isEqual = await bcrypt.compare(password, loadedUser.password);
  if (loadedUser) {
    if (!isEqual) {
      return new ApolloError("Passwords don't match");
    }
    const jwtUserData = {
      email: loadedUser.email,
      id: loadedUser._id,
      fullname: loadedUser.fullname,
      role: loadedUser.role,
      lastActive: loadedUser.lastActive
    };
    const token = await jwtAuthentication.createUserSign(jwtUserData);
    if (loadedUser) {
      const decoded = jwt.decode(token);
      const user = {
        token
      };
      return user;
    }
  }
};

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

export const deleteUser = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const foundUser = await UserModel.findByIdAndDelete({ _id });
    return foundUser;
  } catch (error) {
    return graphqlError(error);
  }
};

export const checkToken = async (_, { token }) => {
  try {
    const response = await jwtAuthentication.checkToken(token);
    return response;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
