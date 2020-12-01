import mongoose from 'mongoose';

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Tag = mongoose.model('Tag', tagsSchema);
export default Tag;
