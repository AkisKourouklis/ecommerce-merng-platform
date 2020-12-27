import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Equals, IsEmail } from 'class-validator';
import { User } from '../../entity/User';
import bcryptjs from 'bcryptjs';
import { GraphQLError } from 'graphql';

@InputType()
export class RegisterInput {
  @Field()
  fullname: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field()
  @Equals('administrator' || 'user', { message: 'User role should be administrator or user.' })
  role: string;
}

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async registerInfo() {
    return 'Here you can register a user, the fields you should pass are, -email -fullname -password -role -lastActive';
  }
  @Mutation(() => User)
  async register(@Arg('data') { email, fullname, password, role }: RegisterInput): Promise<User | GraphQLError> {
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);

      const foundUser = await User.findOne({ where: { email } });

      if (foundUser) {
        return new GraphQLError('User already exists.');
      }

      const user = User.create({
        fullname,
        email,
        password: hashedPassword,
        role
      }).save();

      return user;
    } catch (error) {
      return new GraphQLError(error);
    }
  }
}
