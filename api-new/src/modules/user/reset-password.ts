import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import { forgotPasswordPrefix } from '../../config/vars';

@InputType()
class ResetPasswordInput {
  @Field()
  token: string;

  @Field()
  password: string;
}

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => User, { nullable: true })
  async resetPassword(
    @Arg('data')
    { token, password }: ResetPasswordInput
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    return user;
  }
}
