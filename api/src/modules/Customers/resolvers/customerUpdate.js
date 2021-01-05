import CustomerModel from '../customer.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const customerUpdate = async (_, { data }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const { firstname, lastname, email, phone, country, city, state, address, notes, price, _id } = data;

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      { _id },
      {
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
      },
      { new: true }
    );
    return updatedCustomer;
  } catch (error) {
    graphqlError(error);
  }
};
