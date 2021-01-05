import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    uuid: String,
    customer: {
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
      notes: String,
      price: {
        price: Number,
        comparePrice: Number,
        paid: Number
      }
    },
    products: [
      {
        productId: String,
        name: String,
        description: String,
        quantity: Number,
        sku: String,
        barcode: String,
        color: String,
        material: String,
        size: String,
        weight: Number,
        price: {
          comparePrice: Number,
          price: Number,
          costPrice: Number
        },
        images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
      }
    ]
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
