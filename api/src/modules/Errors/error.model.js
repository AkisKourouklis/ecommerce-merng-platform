import mongoose, { Schema } from 'mongoose';

const errorsSchema = new mongoose.Schema(
  {
    error: String,
    uuid: String
  },
  { timestamps: true }
);

const Error = mongoose.model('Error', errorsSchema);
export default Error;
