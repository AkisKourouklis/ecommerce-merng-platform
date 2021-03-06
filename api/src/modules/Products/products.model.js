import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    vendor: String,
    sku: String,
    barcode: String,
    isActive: Boolean,
    quantity: Number,
    tax: Number,
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    price: {
      comparePrice: Number,
      costPrice: Number,
      price: Number
    },
    seo: {
      name: String,
      description: String
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
