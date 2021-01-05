import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    phone: {
      code: Number,
      number: String
    },
    country: String,
    city: String,
    state: String,
    address: String,
    notes: String
  },
  { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
