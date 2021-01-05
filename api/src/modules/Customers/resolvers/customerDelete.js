import CustomerModel from '../customer.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const customerDelete = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);
  try {
    const deletedCustomer = await CustomerModel.findByIdAndRemove({ _id });
    return deletedCustomer;
  } catch (error) {
    graphqlError(error);
  }
};
