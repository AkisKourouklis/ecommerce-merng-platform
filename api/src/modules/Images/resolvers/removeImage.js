import fs from 'fs';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const removeImage = async (_, { path }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    fs.unlink(path);
    return 'File removed.';
  } catch (error) {
    graphqlError(error);
  }
};
