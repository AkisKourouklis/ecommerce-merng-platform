import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import { camelize } from '../../../utils/camelize';
import { graphqlError } from '../../Errors/error';
import ImageModel from '../../Images/images.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import VariantModel from '../variants.model';

export const addImageToVariant = async (_, { files, variantId }, context) => {
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

        await stream.pipe(createWriteStream(file)).on('data');

        const newImage = new ImageModel({
          alt: filename,
          path: savePath
        });
        newImage.save();

        await VariantModel.findByIdAndUpdate({ _id: variantId }, { $push: { images: newImage._id } }, { new: true });

        return { _id: newImage._id, path: savePath, alt: filename };
      })
    );

    return result;
  } catch (err) {
    graphqlError(err);
  }
};
