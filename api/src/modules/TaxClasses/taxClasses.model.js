import mongoose from 'mongoose';

const taxClassSchema = new mongoose.Schema(
  {
    name: String,
    tax: Number
  },
  { timestamps: true }
);

const TaxClass = mongoose.model('TaxClass', taxClassSchema);
export default TaxClass;
