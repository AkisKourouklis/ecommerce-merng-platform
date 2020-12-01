import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    sku: String,
    barcode: String,
    isActive: Boolean,
    quantity: Number,
    availability: String,
    taxClass: [{ type: Schema.Types.ObjectId, ref: 'TaxClass' }],
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    price: {
      comparePrice: Number,
      price: Number
    },
    seo: {
      name: String,
      keywords: [
        {
          name: String
        }
      ],
      description: String,
      image: String
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
