import CustomerModel from '../customer.model';
import jwtAuthentication from '../../../middleware/auth.middleware';
import { graphqlError } from '../../Errors/error';

export const customerFindById = async (_, { _id }, context) => {
  await jwtAuthentication.verifyTokenMiddleware(context);

  try {
    const customer = await CustomerModel.findById({ _id });

    return customer;
  } catch (error) {
    graphqlError(error);
  }
};
