import mongoose, { Schema } from 'mongoose';

const imagesSchema = new mongoose.Schema(
  {
    alt: {
      type: String
    },
    url: {
      type: String
    },
    size: {
      type: Number
    }
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', imagesSchema);
export default Image;
