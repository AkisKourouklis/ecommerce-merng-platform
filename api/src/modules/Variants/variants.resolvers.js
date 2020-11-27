import VariantModel from './variants.model';
import jwtAuthentication from '../../middleware/auth';
import { graphqlError } from '../Errors/error';

export const findAllVariants = async (_, { search = null, page = 1, limit = 20 }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    let searchQuery = {};

    if (search) {
      searchQuery = {
        $or: [
          { color: { $regex: search, $options: 'i' } },
          { size: { $regex: search, $options: 'i' } },
          { material: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } },
          { barcode: { $regex: search, $options: 'i' } }
        ]
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

export const createVariant = async (_, { variantInfo }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { color, size, price, quantity, sku, barcode, images } = JSON.parse(JSON.stringify(variantInfo));
    const newVariant = new VariantModel({
      color,
      size,
      price,
      quantity,
      sku,
      barcode,
      images: images.id
    });
    await newVariant.save();
    return newVariant;
  } catch (error) {
    return graphqlError(error);
  }
};
