import TagModel from '../tags.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const createTag = async (_, { name }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const newTag = new TagModel({
      name
    });
    await newTag.save();
    return newTag;
  } catch (error) {
    return graphqlError(error);
  }
};
