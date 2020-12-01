import mongoose, { Schema } from 'mongoose';

const variantsSchema = new mongoose.Schema(
  {
    color: String,
    size: String,
    material: String,
    weight: Number,
    price: {
      comparePrice: Number,
      price: Number,
      costPrice: Number
    },
    quantity: Number,
    sku: String,
    barcode: String,
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
  },
  { timestamps: true }
);

const Variant = mongoose.model('Variant', variantsSchema);
export default Variant;
