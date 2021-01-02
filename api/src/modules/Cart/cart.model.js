import mongoose, { Schema } from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    uuid: String,
    products: [
      {
        productId: String,
        quantity: String,
        sku: String,
        barcode: String,
        color: String,
        material: String,
        size: String,
        weight: String,
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

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
