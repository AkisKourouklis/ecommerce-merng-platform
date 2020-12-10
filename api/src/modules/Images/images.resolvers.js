import jwtAuthentication from '../../middleware/auth.middleware';
import { graphqlError } from '../Errors/error';
import fs, { createWriteStream } from 'fs';
import Image from './images.model';
import { v4 as uuid } from 'uuid';
import { ImageProcess } from '../../utils/image-processing';
import { camelize } from '../../utils/camelize';

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

export const uploadImage = async (_, { files }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const loadedFiles = await Promise.all(files);
    const result = Promise.all(
      loadedFiles.map(async (data) => {
        const stream = data.createReadStream();
        const filename = camelize(data.filename);

        const newUuid = uuid();
        const file = `public/images/${newUuid}-${filename}`;
        const savePath = `/images/${newUuid}-${filename}`;

        await stream.pipe(createWriteStream(file)).on('data', async () => {
          await ImageProcess(file, 60);
        });

        const newImage = new Image({
          alt: filename,
          path: savePath
        });
        newImage.save();

        return { _id: newImage._id, path: savePath, alt: filename };
      })
    );
    return result;
  } catch (err) {
    graphqlError(err);
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
