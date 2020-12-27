import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { User } from '../../entity/User';
import bcryptjs from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { createUserSign } from '../../middleware/auth';

@InputType()
class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class Token {
  @Field()
  token: string;
}

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async LoginInfo() {
    return 'Here you can Login a user, the fields you should pass are, -email -fullname -password -role -lastActive';
  }
  @Mutation(() => Token, { nullable: true })
  async login(@Arg('data') { email, password }: LoginInput): Promise<Token | GraphQLError> {
    try {
      const foundUser: User | undefined = await User.findOne({ where: { email } });
      if (!foundUser) {
        return new GraphQLError('User does not exist');
      }

      const isEqual: boolean = await bcryptjs.compare(password, foundUser?.password);
      if (!isEqual) {
        return new GraphQLError("Passwords don't match");
      }
      const jwtUserData = {
        email: foundUser.email,
        id: foundUser.id,
        fullname: foundUser.fullname,
        role: foundUser.role
      };
      const token: string = createUserSign(jwtUserData);
      return { token: token };
    } catch (error) {
      return new GraphQLError(error);
    }
  }
}
