import { GraphQLError } from 'graphql';
import { redis } from '../../redis';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { forgotPasswordPrefix } from '../../config/vars';
import { v4 } from 'uuid';
import { User } from '../../entity/User';
import { ISendEmail, sendEmail } from '../../middleware/email';
import { clientUrl } from '../../config/vars';

@Resolver()
export class ForgotPasswordResolver {
  @Query(() => String)
  async ForgotPasswordInfo() {
    return 'Forgot your passwwprd, the fields you should pass are, -email';
  }
  @Mutation(() => String)
  async forgotPassword(@Arg('email') email: string): Promise<boolean | GraphQLError> {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return new GraphQLError('User does not exist');
      }

      const token = v4();
      await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24); // 1 day expiration

      const sendEmailObj: ISendEmail = {
        email,
        html: `<a href="${clientUrl.uri}/reset-password/${token}">${clientUrl.uri}/reset-password</a>`,
        subject: 'Αλλαγή κωδικού πρόσβασης',
        text: 'Αλλαγη κωδικού πρόσβασης'
      };
      await sendEmail(sendEmailObj);
      return true;
    } catch (error) {
      return new GraphQLError(error);
    }
  }
}
