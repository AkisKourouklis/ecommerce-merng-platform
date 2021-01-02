import { ApolloError } from 'apollo-server';
import CartModel from '../cart.model';
import jwtAuthentication from '../../../middleware/auth.middleware';

export const cartCreate = async (_, { data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    console.log(data);
    const { uuid, products } = data;

    const newCart = new CartModel({
      uuid,
      products
    });

    await newCart.save();

    return newCart;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
