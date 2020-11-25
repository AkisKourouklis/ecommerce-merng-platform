import ImageModel from './images.model';
import jwtAuthentication from '../../middleware/auth.middleware';
import { graphqlError } from '../Errors/error';
import path from 'path';
import fs from 'fs';
import { apiUrl } from '../../config/vars';

export const findAllImages = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  let searchQuery = {};

  if (search) {
    searchQuery = {
      $or: [{ alt: { $regex: search, $options: 'i' } }]
    };
  }

  const images = await Image.find(searchQuery)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  const count = await Image.countDocuments(searchQuery);

  return {
    images,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};

export const uploadImage = async (_, { file }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    //save image to directory
    const { createReadStream, filename } = await file;

    const stream = createReadStream();
    const pathname = path.join(__dirname, `/public/images/${filename}`);
    await stream.pipe(fs.createWriteStream(pathname));

    //save image to document

    return `${apiUrl}/images/${filename}`;
  } catch (error) {
    graphqlError(error);
  }
};

export const removeImage = async (_, { path }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    fs.unlink(path);

    return 'File removed.';
  } catch (error) {
    graphqlError(error);
  }
};
