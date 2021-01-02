import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';
import Image from '../images.model';
import { ImageProcess } from '../../../utils/image-processing';
import { camelize } from '../../../utils/camelize';

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
