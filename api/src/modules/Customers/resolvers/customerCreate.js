import { ApolloError } from 'apollo-server';
import CustomerModel from '../customer.model';
import jwtAuthentication from '../../../middleware/auth.middleware';

export const customerCreate = async (_, { data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { firstname, lastname, email, phone, country, city, state, address, notes, price } = data;

    const newCustomer = new CustomerModel({
      firstname,
      lastname,
      email,
      phone,
      country,
      city,
      state,
      address,
      notes,
      price
    });

    await newCustomer.save();

    return newCustomer;
  } catch (error) {
    return new ApolloError(`There was an error: ${error}`);
  }
};
