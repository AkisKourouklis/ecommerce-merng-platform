import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    seo: {
      name: String,
      description: String
    }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
