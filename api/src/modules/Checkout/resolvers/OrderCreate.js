import { ApolloError } from 'apollo-server';
import CheckoutModel from '../checkout.model';
import jwtAuthentication from '../../../middleware/auth.middleware';

export const orderCreate = async (_, { data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { uuid, customer, products } = data;

    const newOrder = new CheckoutModel({
      uuid,
      customer,
      products
    });

    await newOrder.save();

    return newOrder;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
