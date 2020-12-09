import VariantModel from './variants.model';
import ProductModel from '../Products/products.model';
import jwtAuthentication from '../../middleware/auth.middleware';
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
      .populate('Image')
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
        ProductModel.findByIdAndUpdate({ _id: productId }, { $push: { variants: data._id } }, { new: true })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      return newVariant;
    }
  } catch (error) {
    return graphqlError(error);
  }
};

export const updateVariant = async (_, { variantInput, _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { color, size, price, quantity, sku, barcode, images } = JSON.parse(JSON.stringify(variantInfo));

    const updateQuery = {};

    if (color) {
      updateQuery.color = color;
    }
    if (size) {
      updateQuery.size = size;
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

    const updatedVariant = await VariantModel.findByIdAndUpdate({ _id }, updateQuery, { new: true });
    return updatedVariant;
  } catch (error) {
    return graphqlError(error);
  }
};
