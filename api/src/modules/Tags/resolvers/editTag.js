import TagModel from '../tags.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const editTag = async (_, { _id, name }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const updateImage = await TagModel.findByIdAndUpdate({ _id }, { name }, { new: true });
    return updateImage;
  } catch (error) {
    return graphqlError(error);
  }
};
