import { v4 as uuid } from 'uuid';
import ImageModel from '../Images/images.model';
import VariantModel from './variants.model';
import ProductModel from '../Products/products.model';
import jwtAuthentication from '../../middleware/auth.middleware';
import { graphqlError } from '../Errors/error';
import { camelize } from '../../utils/camelize';
import { createWriteStream } from 'fs';

export const findAllVariants = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [{ sku: { $regex: search, $options: 'i' } }]
      };
    }

    const variants = await VariantModel.find(searchQuery)
      .populate('images')
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await VariantModel.countDocuments(searchQuery);

    return {
      variants,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
  } catch (error) {
    return graphqlError(error);
  }
};

export const findVariantById = async (_, { variantId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const singleVariant = await VariantModel.findById({ _id: variantId }).populate('images');
    return singleVariant;
  } catch (error) {
    return graphqlError(error);
  }
};

export const createVariant = async (_, { variantInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { color, size, price, material, quantity, sku, barcode, images, productId } = variantInput;

    const duplicateVariant = await VariantModel.findOne({ sku: sku });
    if (duplicateVariant) {
      graphqlError('Variant with that sku already exists');
    } else {
      const newVariant = new VariantModel({
        color,
        size,
        price,
        quantity,
        sku,
        barcode,
        images,
        material
      });
      await newVariant.save().then((data) => {
        if (productId) {
          ProductModel.findByIdAndUpdate({ _id: productId }, { $push: { variants: data._id } }, { new: true });
        }
      });
      return newVariant;
    }
  } catch (error) {
    return graphqlError(error);
  }
};

export const updateVariant = async (_, { variantInput }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { color, size, price, quantity, sku, barcode, images, material, variantId } = variantInput;

    const updateQuery = {};

    if (color) {
      updateQuery.color = color;
    }
    if (size) {
      updateQuery.size = size;
    }
    if (size) {
      updateQuery.material = material;
    }
    if (price) {
      updateQuery.price = price;
    }
    if (quantity) {
      updateQuery.quantity = quantity;
    }
    if (sku) {
      updateQuery.sku = sku;
    }
    if (barcode) {
      updateQuery.barcode = barcode;
    }
    if (images) {
      updateQuery.images = images;
    }

    const updatedVariant = await VariantModel.findByIdAndUpdate({ _id: variantId }, updateQuery, { new: true });
    return updatedVariant;
  } catch (error) {
    return graphqlError(error);
  }
};

export const deleteVariant = async (_, { variantId }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const foundProduct = await ProductModel.find().populate('variants', null, { _id: variantId });
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: foundProduct[0]._id },
      { $pull: { variants: variantId } },
      { new: true }
    ).populate(['variants', 'tags', 'images', 'taxClass']);
    const removedVariant = await VariantModel.findByIdAndRemove({ _id: variantId }).populate('images');

    return { updatedProduct, removedVariant };
  } catch (error) {
    graphqlError(error);
  }
};

export const removeImageFromVariant = async (_, { imageId, variantId }, context) => {
  try {
    await jwtAuthentication.verifyTokenMiddleware(context);

    const updatedVariant = await VariantModel.findByIdAndUpdate(
      { _id: variantId },
      { $pull: { images: imageId } },
      { new: true }
    );

    return updatedVariant;
  } catch (error) {
    graphqlError(error);
  }
};

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

        await stream.pipe(createWriteStream(file)).on('data', async () => {
          await ImageProcess(file, 60);
        });

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
